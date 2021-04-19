<?php
	//plik przyjmuje jsona w formie tablicy z kluczami: action, idToAffect
	//możliwe wartości klucza action - dzialania:
	//printMyOffers - wyswietlanie postow
	//deleteOffer - usuniecie posta
	//addOffer - dodanie posta
	//editOffer - edycja posta
	//renewOffer - odnowienie posta
	//plik zwraca zmienna response z komunikatem o tym, jak zakonczylo sie dzialanie kodu
	//komunikaty:
	//notLogged - niezalogowany
	//idAffected - id posta na którym wykonano działanie, jak jest -1 to znaczy, że nie wykonano działania
	//deleted - usunięto post
	//renewed - odnowiono post
	//veryBadThingHappened - przypał
	//
	//zwracane zmienne i tablice:
	//oldOffers - oferty starsze niz 30 dni, nieaktualne
	//actualOffers - oferty aktualne

	session_start();

	$json = file_get_contents('php://input');

	$jsonDecoded = json_decode($json);

	require_once 'baza.php';
	$pdo = polacz_baza();

	$response = "";
	$actualOffers = array();
	$oldOffers = array();
	$idAffected = -1;

	if (isset($_SESSION['logged']) && $_SESSION['logged'] == true)
	{
		if ($jsonDecoded -> action == 'printMyOffers')////////////Wyświetlanie postów
		{
			$x = $pdo -> prepare('SELECT * FROM offers WHERE authorId = :id ORDER BY date DESC');
			$x -> bindValue(':id', $_SESSION['id']);
			$x -> execute();
			
			while($offers = $x -> fetch(PDO::FETCH_ASSOC))
			{
				if ($offers['date'] < time() - 2592000)
				{
					$oldOffers[] = $offers;
				}
				else $actualOffers[] = $offers;
			}
			
			$response = "listingOffers";
		}
		else if ($jsonDecoded -> action == 'deleteOffer')//////////Usuwanie postów
		{
			$x = $pdo -> prepare('DELETE FROM offers WHERE authorId = :authorId AND id = :id');               //Frontend musi tutaj wysłać id oferty do usunięcia
			$x -> bindValue(':id', $jsonDecoded -> idToAffect);
			$x -> bindValue(':authorId', $_SESSION['id']);
			$x -> execute();
			$count = $y -> rowCount();
			if ($count == 1) $response = "deleted";;
			else $response = "veryBadThingHappened";
			
			$idAffected = $jsonDecoded -> idToAffect;
		}
		else if ($jsonDecoded -> action == 'renewOffer')////////////////Odnowienie oferty
		{
			$x = $pdo -> prepare('UPDATE offers SET date = :date WHERE id = :id AND authorId = :authorId AND date < :date - 1987200'); //Tydzień przed wygasnieciem
			$x -> bindValue(':authorId', $_SESSION['id']);
			$x -> bindValue(':id', $jsonDecoded -> idToAffect);
			$x -> bindValue(':date', time()); 
			$x -> execute();
			$count = $y -> rowCount();
			if ($count == 1) $response = "renewed";;
			else $response = "veryBadThingHappened";
		}
	}
	else $response = "notLogged";
	
	echo json_encode(array('response' => $response, 'oldOffers' => $oldOffers, 'actualOffers' => $actualOffers, 'idAffected' => $idAffected));
?>
