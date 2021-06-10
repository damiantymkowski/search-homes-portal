import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";

const DeleteUserOffer = () => {
  const [actualOffers, setActualOffers] = useState([] as any);
  const [change, setChange] = useState(false);
  useEffect(() => {
    axios({
      method: "post",
      url: "userPosts.php",
      data: {
        action: "printMyOffers",
      },
      withCredentials: true,
    }).then((response) => {
      setActualOffers(response.data.actualOffers);
    });
  }, [change]);

  const deleteOffer = (id: string) => {
    axios({
      method: "post",
      url: "userPosts.php",
      data: {
        idToAffect: id,
        action: "deleteOffer",
      },
      withCredentials: true,
    }).then((response) => {
      setChange(!change);
    });
  };

  return (
    <>
      <h2>Twoje ogłoszenia (aktywne)</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tytuł</th>
            <th>Cena (zł)</th>
            <th>Operacja</th>
          </tr>
        </thead>
        <tbody>
          {actualOffers.map((offer: any) => {
            return (
              <tr>
                <td>{offer.id}</td>
                <td>{offer.title}</td>
                <td>{offer.Price}</td>
                <td>
                  <Button
                    onClick={(id) => deleteOffer(offer.id)}
                    variant="danger"
                  >
                    Usuń
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default DeleteUserOffer;
