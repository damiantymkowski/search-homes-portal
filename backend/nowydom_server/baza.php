<?php

function polacz_baza()
{
	
	try
	{
		$pdo = new PDO('mysql:host=localhost;dbname=nowydom;charset=utf8mb4', 'sklep', 'sklep');
		
	}
	catch(PDOException $e)
	{
      echo 'Połączenie nie mogło zostać utworzone: ' . $e->getMessage();
      $pdo = null;
	}
	$s = $pdo -> prepare("SET CHARSET utf8");
	$s -> execute();
	$d = $pdo -> prepare("SET NAMES 'utf8mb4' COLLATE 'utf8mb4_general_ci'");
	$d -> execute();
	return $pdo;
 }
