<?php
	//plik przyjmuje jsona w formie tablicy z kluczami: action, from, amount
	//możliwe wartości klucza action - dzialania:
	//printOffers - wyswietlanie postow
	//from - od ktorego ID wyswietlac posty
	//amount - ilosc wyswietlanych postow (ograniczona do 100 w kodzie)
	
	//zwracane zmienne i tablice:
	//actualOffers - oferty aktualne
	//response - o wartości: listingOffers - listowanie postów

	session_start();

	$json = file_get_contents('php://input');

	$jsonDecoded = json_decode($json);

	require_once 'baza.php';
	$pdo = polacz_baza();
	$actualOffers = array();

	$response = "";

	if ($jsonDecoded -> action == 'printOffers')////////////Wyświetlanie postów
	{
		if ($jsonDecoded -> amount > 100)
		{
			$jsonDecoded -> amount = 100;
		}
		
		$x = $pdo -> prepare('SELECT * FROM offers WHERE date >= :timeCheck ORDER BY date DESC LIMIT :a,:b'); //posty według daty
		$x -> bindValue(':id', $_SESSION['id']);
		$x -> bindValue(':timeCheck', time() - 2592000);
		$x -> bindValue(':a', $jsonDecoded -> from);
		$x -> bindValue(':b', $jsonDecoded -> amount);
		$x -> execute();
		
		while($offers = $x -> fetch(PDO::FETCH_ASSOC))
		{
			if ($offers['date'] >= time() - 2592000)
			{
				$actualOffers[] = $offers;
			}
		}
			
		$response = "listingOffers";
	}
	echo json_encode(array('response' => $response, 'actualOffers' => $actualOffers));
?>