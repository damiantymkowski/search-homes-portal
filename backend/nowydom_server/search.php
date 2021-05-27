<?php

$json = file_get_contents('php://input');

$jsonDecoded = json_decode($json);

require_once 'baza.php';
$pdo = polacz_baza();

$response = "";
$results = array();
$from = 0;
$amount = 0;
/*
zwróci pozycje spełniające zadane kryteria
PRZYKŁADOWE ZAPYTANIE
{
	"action" : "search",    // informujemy, że będzie wyszukiwanie
	"from"   : 0,           // zwróć od pozycji nr 0 w wynikach (domyślnie 0)
	"amount" : 10,          // zwróć 10 pozycji (domyślnie 20, maksymalnie 100)
	"criteria" :            // kryteria wyszukiwania (połączone - AND)
				[
					{
						"paramID"  : 2,   //parametr o identyfikatorze 2...
						"operator" : "eq",  //...równy...
						"value"    : 235    //...wartości 235
					},
					{
						"paramID"  : 5,   //parametr o identyfikatorze 5...
						"operator" : "lk",  //...zawiera w sobie...
						"value"    : "okolicy"    //...tekst „okolicy”
					}
				]
}

 operatory:	lt = less than (<)
			 gt = greater than (>)
			  eq = equals (=)
			  lk = zawiera (SQLowe LIKE %wartość%)
*/


switch ($jsonDecoded -> action)
{
	case 'search':
		if (!isset ($jsonDecoded -> from) || !is_numeric ($jsonDecoded -> from))
			$from = 0;
		else
			$from = $jsonDecoded -> from;
			

		if (!isset ($jsonDecoded -> amount) || !is_numeric ($jsonDecoded -> amount) || $jsonDecoded -> amount > 100)
			$amount = 20;
		else
			$amount = $jsonDecoded -> amount;


		$crit = '';
		foreach ($jsonDecoded -> criteria as $ck => $cv)
		{
			$op = $cv -> operator;
			if ($op == 'lt')
				$crit .= ' AND :cid'.$ck.' < :cval'.$ck;
			else if ($op == 'gt')
				$crit .= ' AND :cid'.$ck.' > :cval'.$ck;
			else if ($op == 'eq')
				$crit .= ' AND :cid'.$ck.' = :cval'.$ck;
			else if ($op == 'lk')
			{
				$cv -> value = '%'.$cv -> value.'%';
				$crit .= ' AND :cid'.$ck.' LIKE %cval'.$ck;
			}
		}

		$b = $pdo -> prepare ('SELECT offers.* FROM offers, datavalues
								WHERE offers.id = datavalues.offerId
								AND offers.date >= :timeCheck'
								.$crit.
								' LIMIT :amount OFFSET :from';
						
		$b -> bindValue(':timeCheck', time()-2592000, PDO::PARAM_INT);
		$b -> bindValue(':amount', $amount, PDO::PARAM_INT);
		$b -> bindValue(':from', $from, PDO::PARAM_INT);

		foreach ($jsonDecoded -> criteria as $ck => $cv)
		{
			$b -> bindValue(':cid'.$ck, $cv -> paramId, PDO::PARAM_INT);
			$b -> bindValue(':cval'.$ck, $cv -> value);
		}
		$b -> execute();
		
		$results = $b -> fetchAll (PDO::FETCH_ASSOC);
		$response = "searchResults";
		
		break;
	default:
		break;
}

?>