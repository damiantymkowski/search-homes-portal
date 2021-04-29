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

		$x = $pdo -> prepare('SELECT * FROM offers WHERE date >= :timeCheck ORDER BY date DESC LIMIT :a,:b'); //posty według daty
		$x -> bindValue(':a', $from);
		$x -> bindValue(':b', $amount);
		$x -> bindValue(':id', $_SESSION['id']);
		$x -> bindValue(':timeCheck', time() - 2592000);
		
		$x -> execute();
		
		while($offers = $x -> fetch(PDO::FETCH_ASSOC))
		{
			//if ($offers['date'] >= time() - 2592000)  //Arek, to jest stare chyba i załatwione przez timeCheck w zapytaniu wyżej
			//{
				$actualOffers[] = $offers;
			//}
		}
			
		$response = "listingOffers";
	}
	echo json_encode(array('response' => $response, 'actualOffers' => $actualOffers));
?>