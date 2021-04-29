<?php
	//plik przyjmuje jsona w formie tablicy z kluczami: action, postId, from, amount
	//możliwe wartości klucza action - dzialania:
	//printOffers - wyswietlanie postow
	//from - od ktorego ID wyswietlac posty
	//amount - ilosc wyswietlanych postow (ograniczona do 100 w kodzie)
	
	//zwracane zmienne i tablice:
	//response - o wartości: 
    //listingReportedOffers - wyświetlanie zgłoszonych ofert
    //deletedReportedOffer - usunięto zgłoszoną ofertę  
    //bannedUser - zbanowano użytkownika  

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

            $x = $pdo -> prepare('SELECT * FROM reportedoffers LIMIT :a,:b'); //posty według daty
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
            $banId = $x -> fetch()[0] == 0;

            $x = $pdo -> prepare('UPDATE users SET ban = 1 WHERE userId = :id');
            $x -> bindValue(":id", $banId);
            $x -> execute();

            $response = "bannedUser";
        }

        if ($jsonDecoded -> action == 'printAdmins') //////////////Wyświetlanie kont 
        {
            $x -> $pdo -> prepare('SELECT position FROM admins WHERE userId = :id');
            $x -> bindValue(":id", $_SESSION['idAdmin']);
            $x -> execute();

            $position = $x -> fetch()[0] == 0;

            if ($position = 2)                             ////////////postion = 1 - admin, position = 0 - moderator
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
    }   
    else $response = "notLoggedAdmin";   

	echo json_encode(array('response' => $response, 'reportedOffers' => $reportedOffers, 'reportedMessages' => $reportedMessages, 'admins' => $adminsArray));
?>