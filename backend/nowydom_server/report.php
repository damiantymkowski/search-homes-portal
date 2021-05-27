<?php
	//plik przyjmuje jsona w formie tablicy z kluczami: action, postId, description
	//możliwe wartości klucza action - dzialania:
	//printOffers - wyswietlanie postow
	//from - od ktorego ID wyswietlac posty
	//amount - ilosc wyswietlanych postow (ograniczona do 100 w kodzie)
	
	//zwracane zmienne i tablice:
	//response - o wartości: 
    //addedReport - zgłoszono
    //alreadyReported - zgłoszono już wcześniej przez tego użytkownika, nie dodano zgłoszenia

	session_start();

	$json = file_get_contents('php://input');
	$jsonDecoded = json_decode($json);

	require_once 'baza.php';
	$pdo = polacz_baza();

	$response = "";
    if (isset($_SESSION['logged']) && $_SESSION['logged'] == true) //Czy zalogowany
	{
        if ($jsonDecoded -> action == 'addReport')////////////Zgłoszenie ogłoszenia do moderacji
        {
            $x = $pdo -> prepare('SELECT COUNT(id) FROM reportedoffers WHERE offerId = :offerId AND reporterId = :reporterId');
            $x -> bindValue(":offerId", $jsonDecoded -> postId, PDO::PARAM_INT);
            $x -> bindValue(":reporterId", $_SESSION['id'], PDO::PARAM_INT);
            $x -> execute();

            if ($x -> fetch()[0] == 0)
            {
                $x = $pdo -> prepare('INSERT INTO reportedoffers (reporterId, offerId, description) VALUES (:reporterId, :offerId, :description)');
                $x -> bindValue(":reporterId", $_SESSION['id'], PDO::PARAM_INT);
                $x -> bindValue(":offerId", $jsonDecoded -> postId);
                $x -> bindValue(":description", $jsonDecoded -> description);
                $x -> execute();
    
                $response = "reportAdded";
            }
            else $response = "alreadyReported";
        }
    }   
    else $response = "notLogged";   
	echo json_encode(array('response' => $response, 'actualOffers' => $actualOffers));
?>