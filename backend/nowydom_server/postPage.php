<?php
	//plik przyjmuje jsona w formie tablicy z kluczami: action, postId
	//możliwe wartości klucza action - dzialania:
	//printOffer - wyswietlanie postu

	//zwracane zmienne i tablice:
	//response: - printingOffer - wyswietlanie postu

	session_start();

	$json = file_get_contents('php://input');

	$jsonDecoded = json_decode($json);

	require_once 'baza.php';
	$pdo = polacz_baza();
	$actualOffers = array();

	$response = "";


	if ($jsonDecoded -> action == 'printOffer')////////////Wyświetlanie postu
	{
		$s = $pdo -> prepare('SELECT * FROM offers WHERE id = :id');
		$s -> bindValue(':id', $jsonDecoded -> postId);
		$s -> execute();
		$postInfo = $s -> fetch(PDO::FETCH_ASSOC);

		$s = $pdo -> prepare('SELECT datanames.name, datavalues.value FROM datavalues, datanames WHERE offerId = :offerId AND datanames.id = datavalues.nameId');       //////Damian wypowiedz sie, wciaz aktualne, nazwa czy id
		$s -> bindValue(':offerId', $jsonDecoded -> postId);
		$s -> execute();
		$dataInfo = $s -> fetchAll(PDO::FETCH_ASSOC);

        		$s = $pdo -> prepare('SELECT url FROM photos WHERE offerId = :offerId');       //////Damian wypowiedz sie, wciaz aktualne, nazwa czy id
        		$s -> bindValue(':offerId', $jsonDecoded -> postId);
        		$s -> execute();
        		$photos = $s -> fetchAll(PDO::FETCH_ASSOC);

		$response = "printingOffer";


	}

	echo json_encode(array('response' => $response, 'postInfo' => $postInfo, 'dataInfo' => $dataInfo, 'photos' => $photos));

?>