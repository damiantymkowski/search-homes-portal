<?php
	//plik przyjmuje jsona w formie tablicy z kluczami: action, postId, from, amount, userId, email, password, firstname, surname, position
	//możliwe wartości klucza action - dzialania:
	//printOffers - wyswietlanie postow
	//from - od ktorego ID wyswietlac posty
	//amount - ilosc wyswietlanych postow (ograniczona do 100 w kodzie)
	
	//zwracane zmienne i tablice:
	//response - o wartości: 
    //listingReportedOffers - wyświetlanie zgłoszonych ofert
    //deletedReportedOffer - usunięto zgłoszoną ofertę  
    //bannedUser - zbanowano użytkownika  
    //notAuthorized - wyświetlanie adminów
    //notLoggedAdmin - niezalogowany admin
    //notAuthorized - pozycja konta niewystarczająca do wykonania akcji
    //deletedAdminAccount - usunięto konto admina

	session_start();

	$json = file_get_contents('php://input');

	$jsonDecoded = json_decode($json);

	require_once 'baza.php';
	$pdo = polacz_baza();

	$response = "";
    $reportedOffers = array();
    $reportedMessages = array();
    $adminsArray = array(); 

    if ($jsonDecoded -> action == 'loginAdmin') /////////////////Logowanie admina
    {
        $s = $pdo -> prepare ('SELECT password, id FROM admins WHERE mail = :mail');
		$s -> bindValue (':mail', $jsonDecoded -> email);
		$s -> execute();
		$odp = $s -> fetch();
		if (isset($odp[0]))
		{	
            if (password_verify($jsonDecoded -> password, $odp[0]))
            {
                $_SESSION['loggedAdmin'] = true;
                $_SESSION['mail'] = $jsonDecoded -> email;
                $_SESSION['idAdmin'] = $odp[1];

                $response = "successLogin";
            }
            else
            {
                $response = "wrongPassword";
            }
		}
		else
		{
			$response = "noUserAdmin";

		}
    }

    if (isset($_SESSION['loggedAdmin']) && $_SESSION['loggedAdmin'] == true) //Czy zalogowany admin
	{
        if ($jsonDecoded -> action == 'printReportedOffers') /////////////Wyświetlanie zgłoszonych ofert
        {
            if (!isset ($jsonDecoded -> from) || !is_numeric ($jsonDecoded -> from))
            {
                $from = 0;
            }

            if (!isset ($jsonDecoded -> amount) || !is_numeric ($jsonDecoded -> amount)) 
            {
                $amount = 20;
            }

            if (isset ($jsonDecoded -> from) && is_numeric ($jsonDecoded -> from))
            {
                $from = $jsonDecoded -> from;
            }

            if (isset ($jsonDecoded -> amount) && is_numeric ($jsonDecoded -> amount))
            {
                if ($jsonDecoded -> amount > 100)
                {
                    $jsonDecoded -> amount = 100;
                }
                $amount = $jsonDecoded -> amount;
            }

            $x = $pdo -> prepare('SELECT * FROM reportedoffers'); //posty według daty
            $x -> bindValue(':a', $from);
            $x -> bindValue(':b', $amount);
            //$x -> bindValue(':timeCheck', time() - 2592000);                 //moderacja będzie przeprowadzana też na nieaktualnych postach
            $x -> execute();
            
            while($offers = $x -> fetch(PDO::FETCH_ASSOC))
            {
                $reportedOffers[] = $offers;
            }
                
            $response = "listingReportedOffers";
        }

        if ($jsonDecoded -> action == 'deleteReportedOffers') /////////////Usuwanie zgłoszonej oferty
        {
            $x = $pdo -> prepare('DELETE FROM offers WHERE id = :offerId');
            $x -> bindValue(":offerId", $jsonDecoded -> postId);
            $x -> execute();

            $response = "deletedReportedOffer";
        }

        if ($jsonDecoded -> action == 'printReportedMessages') /////////////Wyświetlanie zgłoszonych wiadomości
        {
            if (!isset ($jsonDecoded -> from) || !is_numeric ($jsonDecoded -> from))
            {
                $from = 0;
            }

            if (!isset ($jsonDecoded -> amount) || !is_numeric ($jsonDecoded -> amount)) 
            {
                $amount = 20;
            }

            if (isset ($jsonDecoded -> from) && is_numeric ($jsonDecoded -> from))
            {
                $from = $jsonDecoded -> from;
            }

            if (isset ($jsonDecoded -> amount) && is_numeric ($jsonDecoded -> amount))
            {
                if ($jsonDecoded -> amount > 100)
                {
                    $jsonDecoded -> amount = 100;
                }
                $amount = $jsonDecoded -> amount;
            }

            $x = $pdo -> prepare('SELECT * FROM reportedmessages LIMIT :a,:b'); //posty według daty
            $x -> bindValue(':a', $from);
            $x -> bindValue(':b', $amount);
            $x -> execute();
            
            while($messages = $x -> fetch(PDO::FETCH_ASSOC))
            {
                $reportedMessages[] = $messages;
            }
                
            $response = "listingReportedMessages";
        }

if ($jsonDecoded -> action == 'ban') //////////////Banowanie
        {
            if (isset ($jsonDecoded -> postId))
            {
                $x = $pdo -> prepare('SELECT authorId FROM offers
                                        INNER JOIN reportedoffers
                                        ON offers.id = reportedoffers.offerId
                                        WHERE reportedoffers.offerId = :offerId');
                $x -> bindValue(":offerId", $jsonDecoded -> postId);                       //Damian to ID dostajesz w tablicy reportedOffers
            }
            else if (isset ($jsonDecoded -> messageId))
            {
                $x = $pdo -> prepare('SELECT authorId FROM messages
                                        INNER JOIN reportedmessages
                                        ON messages.id = reportedmmessages.messageId
                                        WHERE reportedmmessages.messageId = :messageId');
                $x -> bindValue(":messageId", $jsonDecoded -> messageId);                       //Damian to ID dostajesz w tablicy reportedMessages
            }

            $x -> execute();
            $banId = $x -> fetch()[0];

            print_r($banId);

            $x = $pdo -> prepare('UPDATE users SET ban = 1 WHERE id = :id');
            $x -> bindValue(":id", $banId);
            $x -> execute();

            $response = "bannedUser";
        }

        if ($jsonDecoded -> action == 'printAdmins') //////////////Wyświetlanie kont 
        {
            $position = validatePosition ();

            if ($position = 1)                             ////////////postion = 1 - admin, position = 0 - moderator
            {
                $x -> $pdo -> prepare('SELECT * FROM admins');
                $x -> execute();

                while($admins = $x -> fetch(PDO::FETCH_ASSOC))
                {
                    $adminsArray[] = $admins;
                }
                    
                $response = "listingAdmins";
            }
            else $response = "notAuthorized";
        }

        if ($jsonDecoded -> action == 'deleteAdmin') /////////Usuwanie konta admina
        {
            $position = validatePosition ();
            if ($position = 1)                             
            {
                $x -> $pdo -> prepare('DELETE FROM admins WHERE userId = :id');
                $x -> bindValue(":id", $jsonDecoded -> userId);
                $x -> execute();

                $response = "deletedAdminAccount";
            }
            else $response = "notAuthorized";
        }

        if ($jsonDecoded -> action == 'addAdmin') /////////Dodawanie konta admina
        {
            $position = validatePosition ();
            if ($position = 1)                             
            {
                if (! (strlen($jsonDecoded -> password) >= 8 && filter_var($jsonDecoded -> email, FILTER_VALIDATE_EMAIL) ))
                {
                    $response = "badData";
                    //$registration = true;
                }
                else
                {
                    $s = $pdo -> prepare ('SELECT COUNT(mail) FROM admins WHERE mail = :mail');
                    $s -> bindValue (':mail', $jsonDecoded -> email);
                    $s -> execute();

                    if ($s -> fetch()[0] == 0)
                    {
                        $password =  password_hash($jsonDecoded -> password, PASSWORD_DEFAULT);
                        $x -> $pdo -> prepare('INSERT INTO admins (mail, password, firstname, surname, position)');
                        $x -> bindValue("mail", $jsonDecoded -> mail);
                        $x -> bindValue("mail", $password);
                        $x -> bindValue("mail", $jsonDecoded -> firstname);
                        $x -> bindValue("mail", $jsonDecoded -> surname);
                        $x -> bindValue("mail", $jsonDecoded -> position);
                        $x -> execute();

                        $response = "addedAdminAccount";
                    }
                    else
                    {
                        $response = "userAlreadyExists";
                        //$registration = true;
                    }
                }
            }
            else $response = "notAuthorized";
        }
    }   
    else $response = "notLoggedAdmin";   

	echo json_encode(array('response' => $response, 'reportedOffers' => $reportedOffers, 'reportedMessages' => $reportedMessages, 'admins' => $adminsArray));

    function validatePosition()
    {
        $x -> $pdo -> prepare('SELECT position FROM admins WHERE userId = :id');
        $x -> bindValue(":id", $_SESSION['idAdmin']);
        $x -> execute();

        $position = $x -> fetch()[0] == 0;
        return $position;
    }
?>