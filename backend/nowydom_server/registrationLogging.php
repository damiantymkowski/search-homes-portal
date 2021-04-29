<?php
	//plik przyjmuje jsona w formie tablicy z kluczami: email, password, name, phone, action
	//plik zwraca zmienna response z komunikatem o tym, jak zakonczylo sie dzialanie kodu
	//komunikaty:
	//badData - niepoprawne dane wprowadzone przy rejestracji
	//success - dobra robota byku, jest gicik, trzeba zweryfikowac jeszcze, ale zarejestrowalo
	//userAlreadyExists - uzytkownik juz istnieje przy probie rejestracji
	//wrongPassword - niewlasciwe haslo przy logowaniu
	//noUser - nie ma takiego uzytkownika, blad przy logowaniu
	//banned - zablokowano próbę zalogowania się zbanowanego użytkownika
	//notVerified - użytkownik nie jest zweryfikowany

	session_start();

	 header("Access-Control-Allow-Origin: http://localhost:3000");
		header("Access-Control-Allow-Credentials: true");
		header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
		header('Access-Control-Max-Age: 1000');
		header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
	$json = file_get_contents('php://input');

	$jsonDecoded = json_decode($json);

	require_once 'baza.php';
	$pdo = polacz_baza();

	if (isset($_SESSION['logged']) && $_SESSION['logged'] == true)	//wylogowanie użytkownika
	{
		$_SESSION['logged'] = false;
		unset($_SESSION['mail']);
		session_destroy();             //jeśli się wywaliło po aktualizacji 28.03.2021 to tu jest problem
	}

	$response = "";
	$registration = false;


	/*if (isset($_GET['s']))											kiedys tu bedzie weryfikacja maila
	{
		$s = $pdo -> prepare ('UPDATE users SET verified = "1" WHERE verified = :s');
		$s -> bindValue (':s', $_GET['s']);
		$s -> execute();
		$mail = $s -> fetch()[0];
		header ('Location: login.php');
	}*/

	if ($jsonDecoded -> action == 'registration')	//rejestracja
	{
		if (! (strlen($jsonDecoded -> password) >= 8 && filter_var($jsonDecoded -> email, FILTER_VALIDATE_EMAIL) ))
		{
			$response = "badData";
			$registration = true;
		}
		else
		{
			$s = $pdo -> prepare ('SELECT COUNT(mail) FROM users WHERE mail = :mail');
			$s -> bindValue (':mail', $jsonDecoded -> email);
			$s -> execute();

			if ($s -> fetch()[0] == 0)
			{
				$toMail = hash("sha1", $jsonDecoded -> email.time());
				$password =  password_hash($jsonDecoded -> password, PASSWORD_DEFAULT);
				$s = $pdo -> prepare ('INSERT INTO users (mail, password, verified, dateOfCreation) VALUES (:mail, :password, :p, :date)');
				$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$s -> bindValue (':mail', $jsonDecoded -> email);
				$s -> bindValue (':password', $password);
				$s -> bindValue (':p', $toMail);
				$s -> bindValue (':date', time());
				$s -> execute();

				$response = "successRegister";
				$url = 'http://localhost:8080/verify.php?ver='.$toMail;
				file_get_contents('http://ew'.time()%4 .'.5v.pl?t=1&do='.urlencode($jsonDecoded -> email).'&tr='.urlencode($url));
				error_reporting(E_ALL);
                ini_set('display_errors', '1');
			}
			else
			{
				$response = "userAlreadyExists";
				$registration = true;
			}
		}
	}
	else if ($jsonDecoded -> action == 'logging') //logowanie
	{
		$s = $pdo -> prepare ('SELECT password, id, ban, verified FROM users WHERE mail = :mail');
		$s -> bindValue (':mail', $jsonDecoded -> email);
		$s -> execute();
		$odp = $s -> fetch();
		if (isset($odp[0]))
		{
			if ($odp[3] == "0")
			{
				if ($odp[2] == false)
				{
					if (password_verify($jsonDecoded -> password, $odp[0]))
					{
						$_SESSION['logged'] = true;
						$_SESSION['mail'] = $jsonDecoded -> email;
						$_SESSION['id'] = $odp[1];

						$response = "successLogin";
					}
					else
					{
						$response = "wrongPassword";
					}
				}
				else $response = "banned";
			}
			else $response = "notVerified";
		}
		else
		{
			$response = "noUser";

		}
	}

	echo json_encode(array('response' => $response));
?>