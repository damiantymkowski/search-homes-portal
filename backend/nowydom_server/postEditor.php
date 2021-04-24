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
	//zdjecia beda przechowywane w tablicy (adresy url w tablicy tekstow) 
	//miniaturka jest pierwszym elementem tablicy
	
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
			$vp = validateParameters($jsonDecoded -> params);
			
			if ($vp == 1)
			{
				$response = "lackRequired"; //brak któregoś z wymaganych parametrów
			}
			else if ($vp == 2)
			{
				$response = "badParam"; //któryś parametr jest nieuzupełniony albo jest złego typu
			}
			else
			{
				//parametry są poprawne

				$s = $pdo -> prepare('INSERT INTO offers (title, date, description, miniature, authorId) VALUES (:title, :date, :description, :miniature, :authorId)');
				$s -> bindValues(":title", $jsonDecoded -> title);
				$s -> bindValues(":date", time());
				$s -> bindValues(":description", $jsonDecoded -> description);
				$s -> bindValues(":miniature", $jsonDecoded -> photos[0]);
				$s -> bindValues(":authorId", $_SESSION['id']);
				$s -> execute();

				$lastId = $pdo -> lastInsertId();

				$s = $pdo -> prepare('INSERT INTO photos (offerId, url) VALUES (:offerId, :url)');
				foreach($jsonDecoded->photos as $photo)
				{	
					$s -> bindValues(":offerId", $pdo -> lastInsertId());
					$s -> bindValues(":url", $photo);
					$s -> execute();
				}

				if (insertParameters ($lastId, $jsonDecoded -> params) == 0)
				{
					$response = "postAdded";
				}
				else
				{
					$response = "veryBadThingHappened";//nieoczekiwany błąd
				}
				

			}
		}
		else if ($jsonDecoded -> action == "savePostEdited")  ////////zapisanie edytowanego postu
		{
			$vp = validateParameters($jsonDecoded -> params);
			
			if ($vp == 1)
			{
				$response = "lackRequired"; //brak któregoś z wymaganych parametrów
			}
			else if ($vp == 2)
			{
			    $response = "badParam";	//któryś parametr jest nieuzupełniony albo jest złego typu
			}
			else
			{
				$s = $pdo -> prepare('UPDATE offers SET title = :title, date = :date, description = :description, miniature = :miniature WHERE id = :id');
				$s -> bindValues(":title", $jsonDecoded -> title);
				$s -> bindValues(":description", $jsonDecoded -> description);
				$s -> bindValues(":miniature", $jsonDecoded -> photos[0]);
				$s -> bindValues(":id", $jsonDecoded -> postId);
				$s -> execute();

				$s = $pdo -> preapre ('DELETE FROM photos WHERE offerId = :id');   //usuwamy całość zdjęć
				$s -> bindValues(":id", $jsonDecoded -> postId);
				$s -> execute();

				$s = $pdo -> prepare('INSERT INTO photos (offerId, url) VALUES (:offerId, :url)');         //dodajemy na nowo
				foreach($jsonDecoded->photos as $photo)
				{	
					$s -> bindValues(":offerId", $jsonDecoded -> postId);
					$s -> bindValues(":url", $photo);
					$s -> execute();
				}

				if (insertParameters ($jsonDecoded -> postId, $jsonDecoded -> params) == 0)
				{
					$response = "postEdited";
				}
				else
				{
					$response = "veryBadThingHappened";
				}
			}
			
		}
	}
	else
	{
		$response = "notLogged";
	}
	
	echo json_encode(array('response' => $response, 'parameters' => $parameters, 'postInfo' => $postInfo, 'dataInfo' => $dataInfo));
	
	function insertParameters ($offerId, $parametersArray)
	{
		//offerId - id oferty
		//tablica "parametersArray": klucz jest identyfikatorem parametru w bazie, a wartość to wartość parametru
		//usuwamy obecne dla danej oferty parametry i wpisujemy nowe

		$s = $pdo -> prepare ('DELETE FROM datavalues WHERE offerID = :offerId');
		$s -> bindValue(":offerId", $offerId);
		$s -> execute();
		

		$s = $pdo -> prepare('INSERT INTO datavalues (nameId, offerId, value)');
		foreach ($parametersArray as $key => $value)
		{
			$s -> bindValue(":nameId", $key);
			$s -> bindValue(":offerId", $offerId);
			$s -> bindValue(":value", $value);
			$s -> execute();
		}
		if ($s -> rowCount() == count($parametersArray))
			return 0;
		else
			return 1;
	}
	function validateParameters ($parametersArray)
	{
		global $pdo;
		//parametry: tablica "parametersArray": klucz jest identyfikatorem parametru w bazie, a wartość to wartość parametru
			
		//sprawdzanie poprawności wpisanych parametrów
		//	sprawdzanie, czy wszystkie wymagane parametry są obecne
		$s = $pdo -> prepare('SELECT id FROM datanames WHERE required = 1') -> execute();
		
		while ($ids = $s -> fetch())
		{
			//jeżeli brak któregoś z wymaganych parametrów
			if (!isset ($parametersArray[$ids]))
				return 1;
		}
		
		//	sprawdzenie, czy parametry są odpowiedniego typu (czy są liczbowe, czy są uzupełnione)
		$s = $pdo -> prepare('SELECT id, regex FROM datanames') -> execute();
		
		while ($ids = $s -> fetch())
		{
			if (isset ($parametersArray[$ids[0]]))
			{
				if (!strlen(trim($parametersArray[$ids[0]])) > 0)	//pusty ciąg znakowy
					return 2;
					
					if ($ids[1] != 'NULL')      //jeżeli nie jest predefiniowany (NULL)
					{
						if (!preg_match($ids[1], $parametersArray[$ids[0]]))    //jeżeli nie pasuje do wzorca    
						{
							return 2;
						}
					}
			}
		}
		return 0;
	}
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
