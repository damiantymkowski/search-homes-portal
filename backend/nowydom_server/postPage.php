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
		$s -> $pdo -> prepare('SELECT * FROM offers WHERE id = :id');
		$s -> bindValue(':id', $jsonDecoded -> postId);
		$s -> execute();
		$postInfo = $s -> fetch(PDO::FETCH_ASSOC);	
			
		$s -> $pdo -> prepare('SELECT nameId, value FROM datavalues WHERE offerId = :offerId');       //////Damian wypowiedz sie, wciaz aktualne, nazwa czy id
		$s -> bindValue(':offerId', $jsonDecoded -> postId);
		$s -> execute();
		$dataInfo = $s -> fetch(PDO::FETCH_ASSOC);
			
		$parameters = getParameters();
		$response = "printingOffer";
	}
	
	echo json_encode(array('response' => $response, 'postInfo' => $postInfo, 'dataInfo' => $dataInfo));
	
	function getParameters()
	{
		global $pdo;
		$datanames = array();
		$s = $pdo -> prepare('SELECT * FROM datanames');
		$s -> execute();
		$t = $pdo -> prepare('SELECT value FROM predefinedvalues WHERE nameId = :nameId');
		while($d = $s -> fetch(PDO::FETCH_ASSOC))
		{
			if ($d["regex"] == "NULL")
			{
				$t -> bindValue(':nameId', $d["id"]);
				$t -> execute();
				$d["predefinedvalues"] = $t -> fetchAll(PDO::FETCH_COLUMN, 0);
			}
			$datanames[] = $d;
		}
		return $datanames;
	}
?>