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
 * from
 * amount
 * criteria = array({ paramId: int, operator: string, value: mixed })
 * 
 * operator:	lt = less than
 * 				gt = greater than
 * 				eq = equals
 * 				lk = is part of (SQL: x like %value%) 
 * 
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
					$crit .= ' AND :cid'.$ck.' LIKE %:cval'.$ck.'%';
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
