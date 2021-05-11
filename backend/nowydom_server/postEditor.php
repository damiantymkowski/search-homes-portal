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
	$photosUrl = "";
	if(isset($jsonDecoded->params))
	$jsonDecoded->params = (array)$jsonDecoded->params;

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

			$s -> $pdo -> prepare ('SELECT url FROM photos WHERE offerId = :id');
			$s -> bindValue(':id',  $jsonDecoded -> postId);
			$s -> execute();
			$photosUrl = $s -> fetch(PDO::FETCH_ASSOC);

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

				$s = $pdo -> prepare('INSERT INTO offers (title, date, description, miniature, authorId, price) VALUES (:title, :date, :description, :miniature, :authorId, :price)');
				$s -> bindValue(":title", $jsonDecoded -> title);
				$s -> bindValue(":date", time());
				$s -> bindValue(":description", $jsonDecoded -> description);
				$s -> bindValue(":miniature", $jsonDecoded -> photos[0]);
				$s -> bindValue(":authorId", $_SESSION['id']);
				$s -> bindValue(":price", $jsonDecoded->price);
				$s -> execute();

				$lastId = $pdo -> lastInsertId();

				$s = $pdo -> prepare('INSERT INTO photos (offerId, url) VALUES (:offerId, :url)');

				foreach($jsonDecoded->photos as $photo)
				{
					$s -> bindValue(":offerId", $lastId);
					$s -> bindValue(":url", $photo);
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
				$s = $pdo -> prepare('UPDATE offers SET title = :title, description = :description, miniature = :miniature WHERE id = :id');
				$s -> bindValue(":title", $jsonDecoded -> title);
				$s -> bindValue(":description", $jsonDecoded -> description);
				$s -> bindValue(":miniature", $jsonDecoded -> photos[0]);
				$s -> bindValue(":id", $jsonDecoded -> postId);
				$s -> execute();

				$s = $pdo -> prepare ('DELETE FROM photos WHERE offerId = :id');   //usuwamy całość zdjęć
				$s -> bindValue(":id", $jsonDecoded -> postId);
				$s -> execute();

				$s = $pdo -> prepare('INSERT INTO photos (offerId, url) VALUES (:offerId, :url)');         //dodajemy na nowo


				foreach($jsonDecoded->photos as $photo)
				{
					$s -> bindValue(":offerId", $jsonDecoded -> postId);
					$s -> bindValue(":url", $photo);
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

	echo json_encode(array('response' => $response, 'parameters' => $parameters, 'postInfo' => $postInfo, 'dataInfo' => $dataInfo, 'photosUrl' => $photosUrl));

	function insertParameters ($offerId, $parametersArray)
	{
		//offerId - id oferty
		//tablica "parametersArray": klucz jest identyfikatorem parametru w bazie, a wartość to wartość parametru
		//usuwamy obecne dla danej oferty parametry i wpisujemy nowe

        global $pdo;
		$s = $pdo -> prepare ('DELETE FROM datavalues WHERE offerID = :offerId');
		$s -> bindValue(":offerId", $offerId);
		$s -> execute();

        $i = 0;

		$s = $pdo -> prepare('INSERT INTO datavalues (nameId, offerId, value) VALUES (:nameId, :offerId, :value)');
		foreach ($parametersArray as $key => $value)
		{
			$s -> bindValue(":nameId", $key);
			$s -> bindValue(":offerId", $offerId);
			$s -> bindValue(":value", $value);
			$s -> execute();
			$i+=$s->rowCount();
		}


		if ($i == count($parametersArray))
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
		$s = $pdo -> prepare('SELECT id FROM datanames WHERE required=1');
		$s->execute();

		while ($ids = $s -> fetch())
		{
			//jeżeli brak któregoś z wymaganych parametrów


			if (!isset ($parametersArray[$ids[0]]))
				return 1;
		}

		//	sprawdzenie, czy parametry są odpowiedniego typu (czy są liczbowe, czy są uzupełnione)
		$s = $pdo -> prepare('SELECT id, regex FROM datanames');
		$s->execute();

		while ($ids = $s -> fetch())
		{
			if (isset ($temp[$ids[0]]))
			{
				if (!strlen(trim($parametersArray[$ids[0]])) > 0)	//pusty ciąg znakowy
					return 2;

					if ($ids[1] != NULL)      //jeżeli nie jest predefiniowany (NULL)
					{
					print_r($parametersArray);
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