<?php
	require_once 'nowydom_server/baza.php';
	$pdo = polacz_baza();

	$s = $pdo -> prepare('UPDATE users SET verified=0 WHERE verified=:fromLink');
	$s -> bindValue(':fromLink', $_GET['ver']);
	$s -> execute();
	header("Location: http://localhost:3001");
?>