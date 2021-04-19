<?php
	//plik przyjmuje jsona w formie tablicy z kluczami: action, postId, title, description, miniature
	//możliwe wartości klucza action - dzialania:
	//addPost - dodawanie posta
	//editPost - edycja posta
	//plik zwraca zmienna response z komunikatem o tym, jak zakonczylo sie dzialanie kodu
	//komunikaty:
	//notLogged - niezalogowano
	//parametersReturned - zwrócono parametry w formie tablicy asocjacyjnej
	//editPreview - zwrócono informacje do wyświetlenia przy edycji
	//postAdded - dodano nowy post
	//postEdited - zedytowano post
	
	session_start();

	$json = file_get_contents('php://input');

	$jsonDecoded = json_decode($json);

	require_once 'baza.php';
	$pdo = polacz_baza();

	$response = "";
	$parameters = "";
	$postInfo = "";
	$dataInfo = "";

	if (isset($_SESSION['logged']) && $_SESSION['logged'] == true) /////////////////////DODAWANIE I EDYCJA OGLOSZENIA
	{
		if ($jsonDecoded -> action == "addPost")            ///wyświetlenie do dodania
		{
			$parameters = getParameters();
			$response = "parametersReturned";
		}
		else if ($jsonDecoded -> action == "editPost")                ////wyświetlenie do edycji
		{
			$s -> $pdo -> prepare('SELECT * FROM offers WHERE id = :id');
			$s -> bindValue(':id', $jsonDecoded -> postId);
			$s -> execute();
			$postInfo = $s -> fetch(PDO::FETCH_ASSOC);	
			
			$s -> $pdo -> prepare('SELECT nameId, value FROM datavalues WHERE offerId = :offerId');       //////Damian wypowiedz sie, nazwa czy id
			$s -> bindValue(':offerId', $jsonDecoded -> postId);
			$s -> execute();
			$dataInfo = $s -> fetch(PDO::FETCH_ASSOC);
			
			$parameters = getParameters();
			$response = "editPreview";
		}
		else if ($jsonDecoded -> action == "savePostNew") ////////zapisanie nowego postu
		{
			$s -> $pdo -> prepare('INSERT INTO offers (title, date, description, miniature, authorId) VALUES (:title, :date, :description, :miniature, :authorId)');
			$s -> bindValues(":title", $jsonDecoded -> title);
			$s -> bindValues(":date", time());
			$s -> bindValues(":description", $jsonDecoded -> description);
			$s -> bindValues(":miniature", $jsonDecoded -> miniature);
			$s -> bindValues(":authorId", $_SESSION['id']);
			$s -> execute();

			//$s -> $pdo -> prepare('INSERT INTO datavalues (nameId, offerId, value)');
			//$s -> bindValue(":nameId");
			//$s -> bindValue(":offerId");
			//$s -> bindValue(":value");
			//$s -> execute();

			$response = "postAdded";
		}
		else if ($jsonDecoded -> action == "savePostEdited")  ////////zapisanie edytowanego postu
		{
			$s -> $pdo -> prepare('UPDATE offers SET title = :title, date = :date, description = :description, miniature = :miniature');
			$s -> bindValues(":title", $jsonDecoded -> title);
			$s -> bindValues(":description", $jsonDecoded -> description);
			$s -> bindValues(":miniature", $jsonDecoded -> miniature);
			$s -> execute();

			$response = "postEdited";
		}
	}
	else $response = "notLogged";
	
	echo json_encode(array('response' => $response, 'parameters' => $parameters, 'postInfo' => $postInfo, 'dataInfo' => $dataInfo));
	
	function getParameters()
	{
		global $pdo;
		$datanames = array();
		$s = $pdo -> prepare('SELECT * FROM datanames');
		$s -> execute();
		$t = $pdo -> prepare('SELECT value FROM predefinedvalues WHERE nameId = :nameId');
		while($d = $s -> fetch(PDO::FETCH_ASSOC))
		{
			if ($d["type"] == "predefined")
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
