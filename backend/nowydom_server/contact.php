<?php
	//plik przyjmuje jsona w formie tablicy z kluczami: action, postId
	//możliwe wartości klucza action - dzialania:
	//printChats - wyswietlanie czatów
	//printMsgs - wyświetlanie wiadomości
	//sendMsgToConv - wysłanie do konwersacji
    //sendMsgToOffer - wysłanie do autora ogłoszenia
	
	//zwracane zmienne i tablice:
	//response - o wartości: 
    //messagesEmpty - pusta wiadomość
    //messagesError - błąd wiadomości
    //badId - złe id
    //msgSent - wysłano
    //notLogged - nie zalogowano

    //convsOrMsgs - tablica konwersacji lub wiadomości do wyświetlenia

	session_start();

	$json = file_get_contents('php://input');

	$jsonDecoded = json_decode($json);

	require_once 'baza.php';
	$pdo = polacz_baza();

	$response = "";
    //$favourites = array();
    $convsMsgs = array();

    if (isset($_SESSION['logged']) && $_SESSION['logged'] == true) //Czy zalogowany
	{
		switch ($jsonDecoded -> action)
		{
			case 'printChats':
			
				$response = 'chatList';
				
				$x = $pdo -> prepare('SELECT conversations.id, users.name AS "person", conversations.unreadA AS "unread", offers.title AS "offerTitle", messages.content AS "lastMsgContent", messages.date AS "lastMsgDate"
										FROM conversations, offers, messages, users
										WHERE conversations.personAId = :userId AND conversations.lastMsgId = messages.id AND conversations.offerId = offers.id AND users.id = personBId
										ORDER BY messages.date DESC');
				$x -> bindValue (':userId', $_SESSION['id']);
				$x -> execute ();
				
				$convsMsgs['toMyOffers'] = $x -> fetchAll ();
				
				
				
				$x = $pdo -> prepare('SELECT conversations.id, users.name AS "person", conversations.unreadB AS "unread", offers.title AS "offerTitle", messages.content AS "lastMsgContent", messages.date AS "lastMsgDate"
										FROM conversations, offers, messages, users
										WHERE conversations.personBId = :userId AND conversations.lastMsgId = messages.id AND conversations.offerId = offers.id AND users.id = personAId
										ORDER BY messages.date DESC');
				$x -> bindValue (':userId', $_SESSION['id']);
				$x -> execute ();
				
				$convsMsgs['toNotMyOffers'] = $x -> fetchAll ();

				break;
			
			case 'printMsgs':
				if (isset ( $jsonDecoded -> convId ) && is_numeric (  $jsonDecoded -> convId ))
				{
					$x = $pdo -> prepare('SELECT messages.id, users.name AS "author", users.id AS "authorId", messages.content, messages.date,
												offers.id AS "offerId", offers.title AS "offerTitle", offers.miniature AS "offerMiniature"
											FROM messages, users, offers, conversations
											WHERE messages.conversationId = :convId
												AND (conversations.personAId = :userId 
												OR conversations.personBId = :userId)
												AND users.id = messages.authorId 
												AND offers.id = conversations.offerId 
												AND conversations.id = :convId
											ORDER BY messages.date ASC');
					
					$x -> bindValue (':convId', $jsonDecoded -> convId);
					$x -> bindValue (':userId', $_SESSION['id']);

					if ($x -> execute ())
					{
						$convsMsgs = $x -> fetchAll (PDO::FETCH_ASSOC);
						
						if (isset ($convsMsgs[0]))
						{
							$response = 'messages';
							//oznacz jako przeczytane
							if ($convsMsgs[0]['authorId'] == $_SESSION['id'])	//my pytamy
							{
								$x = $pdo -> prepare ('UPDATE conversations
														SET unreadB = 0
														WHERE conversations.id = :convId');
							}
							else
							{
								$x = $pdo -> prepare ('UPDATE conversations
														SET unreadA = 0
														WHERE conversations.id = :convId');
							}
							$x -> bindValue (':convId', $jsonDecoded -> convId);
							$x -> execute ();
						}
						else
						{
							$response = 'messagesEmpty';
						}
					}
					else
					{
						$response = 'messagesError';
					}
				}
				else
				{
					$response = 'badId';
				}
				break;

			case 'sendMsgToConv':
				if (isset ($jsonDecoded -> convId) && is_numeric($jsonDecoded -> convId))
				{
					$convId = $jsonDecoded -> convId;

					$jsonDecoded -> msgContent = trim ( $jsonDecoded -> msgContent );
					if (strlen ( $jsonDecoded -> msgContent ) > 0)
					{
						$s = $pdo -> prepare ('SELECT personAId, personBId
												FROM conversations
												WHERE id = :convId AND (personBId = :userIdB OR personAId = :userIdA)');
						$s -> bindValue (':convId', $jsonDecoded -> convId);
						$s -> bindValue (':userIdA', $_SESSION['id']);
						$s -> bindValue (':userIdB', $_SESSION['id']);
						$s -> execute();
						

						if ($uczestnicy = $s -> fetch())
						{
							$sc = $pdo -> prepare ('INSERT INTO messages (authorId, content, date, conversationId)
													VALUES (:userId, :content, :date, :convId)');

							$sc -> bindValue (':userId', $_SESSION['id']);
							$sc -> bindValue (':date', time());
							$sc -> bindValue (':convId', $convId);
							$sc -> bindValue (':content', $jsonDecoded -> msgContent);
							$sc -> execute ();
							$lastMsg = $pdo -> lastInsertId ();
							
							$sd = $pdo -> prepare('UPDATE conversations SET lastMsgId=:lastMsg WHERE id = :convId');
							$sd -> bindValue(':lastMsg', $lastMsg);
							$sd -> bindValue(':convId', $convId);
							$sd -> execute();
							$response = 'msgSent';

							if ($uczestnicy[0] == $_SESSION['id'])	//my wysyłamy
							{
								$x = $pdo -> prepare ('UPDATE conversations
														SET unreadB = 1
														WHERE conversations.id = :convId');
							}
							else
							{
								$x = $pdo -> prepare ('UPDATE conversations
														SET unreadA = 1
														WHERE conversations.id = :convId');
							}
							$x -> bindValue (':convId', $jsonDecoded -> convId);
							$x -> execute ();
						}
						$response = 'msgSent';
					}
					else
					{
						$response = 'emptyMsg';
					}
				}
				else
				{
					$response = 'badId';
				}
				break;
			case 'sendMsgToOffer':
				if (isset ($jsonDecoded -> offerId) && is_numeric($jsonDecoded -> offerId))
				{
					$jsonDecoded -> msgContent = trim ( $jsonDecoded -> msgContent );
					if (strlen ( $jsonDecoded -> msgContent ) > 0)
					{
						$s = $pdo -> prepare ('SELECT id FROM conversations WHERE offerId = :offerId AND personBId = :userId');
						$s -> bindValue (':offerId', $jsonDecoded -> offerId);
						$s -> bindValue (':userId', $_SESSION['id']);
						$s -> execute();

						if ($convId = $s -> fetch ())
						{
							//rozmowa już istnieje
							$convId = $convId[0];
							$sd = $pdo -> prepare ('UPDATE conversations SET unreadA = 1 WHERE id = :convId');
							$sd -> bindValue (':convId', $convId);
							$sd -> execute ();

						}
						else
						{	//tworzymy nową rozmowę
							$sa = $pdo -> prepare ('SELECT authorId FROM offers WHERE id = :offerId');
							$sa -> bindValue (':offerId', $jsonDecoded -> offerId, PDO::PARAM_INT);
							$sa -> execute ();
							$offerAuthorId = $sa -> fetch();
							
							if (is_numeric($offerAuthorId[0]))
							{
								$sb = $pdo -> prepare ('INSERT INTO conversations (offerId, personAId, personBId, unreadA, unreadB)
														VALUES (:offerId, :ofAuthor, :userId, 1, 0)');
								
								$sb -> bindValue (':offerId', $jsonDecoded -> offerId);
								$sb -> bindValue (':userId', $_SESSION['id']);
								$sb -> bindValue (':ofAuthor', $offerAuthorId[0]);
								$sb -> execute ();
								$convId = $pdo -> lastInsertId ();								

							}
							else
							{
								$response = 'offerNotFound';
								break;
							}
						}
						$sc = $pdo -> prepare ('INSERT INTO messages (authorId, content, date, conversationId)
												VALUES (:userId, :content, :date, :convId)');

						$sc -> bindValue (':userId', $_SESSION['id']);
						$sc -> bindValue (':date', time());
						$sc -> bindValue (':convId', $convId);
						$sc -> bindValue (':content', $jsonDecoded -> msgContent);
						$sc -> execute ();
						$lastMsg = $pdo -> lastInsertId();

						$sd = $pdo -> prepare('UPDATE conversations SET lastMsgId=:lastMsg WHERE id = :convId');
						$sd -> bindValue(':lastMsg', $lastMsg);
						$sd -> bindValue(':convId', $convId);
						$sd -> execute();
						$response = 'msgSent';

					}
					else
					{
						$response = 'messagesEmpty';
					}
				}
				else
				{
					$response = 'badId';
				}
				break;
				
		}
    }   
    else
    {
		$response = "notLogged";   
	}

	echo json_encode(array('response' => $response, 'convsOrMsgs' => $convsMsgs));
?>
