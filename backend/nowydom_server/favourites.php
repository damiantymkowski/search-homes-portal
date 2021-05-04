<?php
	//plik przyjmuje jsona w formie tablicy z kluczami: action, postId
	//możliwe wartości klucza action - dzialania:
	//printOffers - wyswietlanie postow
	//from - od ktorego ID wyswietlac posty
	//amount - ilosc wyswietlanych postow (ograniczona do 100 w kodzie)
	
	//zwracane zmienne i tablice:
	//response - o wartości: 
    //addedToFav - dodano do ulubionych
    //deletedFromFav - usunięto z ulubionych

	session_start();

	$json = file_get_contents('php://input');

	$jsonDecoded = json_decode($json);

	require_once 'baza.php';
	$pdo = polacz_baza();

	$response = "";
    $favourites = array();

    if (isset($_SESSION['logged']) && $_SESSION['logged'] == true) //Czy zalogowany
	{
        if ($jsonDecoded -> action == 'addToFav')////////////Dodawanie do ulubionych
        {
            $x = $pdo -> prepare('INSERT INTO favourites (offerId, userId) VALUES (:offerId, :userId)');
            $x -> bindValue(":offerId", $jsonDecoded -> postId);
            $x -> bindValue(":userId", $_SESSION['id']);
            $x -> execute();

            $response = "addedToFav";
        }
        if ($jsonDecoded -> action == 'deleteFav')////////////Usuwanie ulubionych
        {
            $x = $pdo -> prepare('DELETE FROM favourites WHERE offerId = :offerId AND userId = :userId');
            $x -> bindValue(":offerId", $jsonDecoded -> postId);
            $x -> bindValue(":userId", $_SESSION['id']);
            $x -> execute();

            $response = "deletedFromFav";
        }
        if ($jsonDecoded -> action == 'printFav')////////////Wyświetlanie ulubionych
        {
            $x = $pdo -> prepare('SELECT * FROM offers INNER JOIN favourites ON offers.id = favourites.offerId 
            WHERE favourites.userId = :userId 
            AND offers.date >= :timeCheck 
            ORDER BY date DESC');

            $x -> bindValue(":offerId", $jsonDecoded -> postId);
            $x -> bindValue(":userId", $_SESSION['id']);
            $x -> bindValue(':timeCheck', time() - 2592000);
            $x -> execute();

            while($offers = $x -> fetch(PDO::FETCH_ASSOC))
            {
                $favourites[] = $offers;
            }
			
		    $response = "listingFavourites";
        }
    }   
    else $response = "notLogged";   

	echo json_encode(array('response' => $response, 'favourites' => $favourites));
?>