<?php
	//plik przyjmuje jsona w formie tablicy z kluczami: actualPassword, newPassword, newEmail, newPhone, newName, action
	//możliwe wartości klucza action - dzialania:
	//changePassword - zmiana hasła
	//changeEmail - zmiana maila
	//changeContactData - zmiana danych użytkownika (jednej lub wielu jednoczesnie)
	//plik zwraca zmienna response z komunikatem o tym, jak zakonczylo sie dzialanie kodu
	//komunikaty:
	//badData - niepoprawne dane, niezgodne z wymaganiami
	//passwordChanged - hasło zostało zmienione
	//emailChanged - email został zmieniony
	//contactDataChanged - dane kontaktowe zostały zmienione
	//veryBadThingHappened - przypał
	//wrongPassword - niewłaściwe aktualne hasło
	//wrongEmail - niewłaściwy aktualne email


//TE byku, zastanów się Damian, czy potrzebujemy serio tego aktualnego maila w formularzu, czy wystarczy nowy email + haslo na potwierdzenie

	session_start();

	$json = file_get_contents('php://input');

	$jsonDecoded = json_decode($json);

	require_once 'baza.php';
	$pdo = polacz_baza();

	$response = "";

	if (isset($_SESSION['logged']) && $_SESSION['logged'] == true) //////////////////////ZMIANA HASŁA I EMAILA
	{
		$x = $pdo -> prepare('SELECT password FROM users WHERE id = :id');
		$x -> bindValue(':id', $_SESSION['id']);
		$x -> execute();
		$res = $x -> fetch();
		
		if ($jsonDecoded -> action == 'changePassword')	//zmiana hasła
		{	
			if (password_verify($jsonDecoded -> actualPassword, $res[0]))
			{
				if (strlen($jsonDecoded -> newPassword) >= 8)
				{
					$password =  password_hash($jsonDecoded -> newPassword, PASSWORD_DEFAULT);
					$y = $pdo -> prepare('UPDATE users SET password = :pass WHERE id = :id');
					$y -> bindValue(':id', $_SESSION['id']);
					$y -> bindValue(':pass', $password);
					$y -> execute();
					$count = $y -> rowCount();
					if ($count == 1) $response = "passwordChanged";
					else $response = "veryBadThingHappened";
				}
				else $response = "badData";
			}
			else $response = "wrongPassword";
		}
		else if ($jsonDecoded -> action == 'changeEmail') //zmiana maila
		{
			if (password_verify($jsonDecoded -> actualPassword, $res[0]))
			{
				if (filter_var($jsonDecoded -> newEmail, FILTER_VALIDATE_EMAIL))
				{
					$y = $pdo -> prepare('UPDATE users SET mail = :mail WHERE id = :id');
					$y -> bindValue(':id', $_SESSION['id']);
					$y -> bindValue(':mail', $jsonDecoded -> newEmail);
					$y -> execute();
					$count = $y -> rowCount();
					if ($count == 1) $response = "emailChanged";
					else $response = "veryBadThingHappened";
				}
				else $response = "badData";
			}
			else $response = "wrongPassword";
		}
		else if ($jsonDecoded -> action == 'changeContactData') //////////////////////ZMIANA DANYCH UŻITKOWNIKA
		{
			$patternPhone = "/^\d{9}$/";
			$patternName = "/[A-Za-z0-9]{3,30}/";
			
			if (preg_match($patternPhone, $jsonDecoded -> newPhone) && preg_match($patternName, $jsonDecoded -> newName))
			{
				$y = $pdo -> prepare('UPDATE users SET phone = :phone, name = :name WHERE id = :id');
				$y -> bindValue(':id', $_SESSION['id']);
				$y -> bindValue(':phone', $jsonDecoded -> newPhone);
				$y -> bindValue(':name', $jsonDecoded -> newName);
				$y -> execute();
				$count = $y -> rowCount();
				if ($count == 1) $response = "contactDataChanged";
				else $response = "veryBadThingHappened";
			}
			else $response = "badData";
		}
	}
	else $response = "notLogged";
	
	echo json_encode(array('response' => $response));
?>
