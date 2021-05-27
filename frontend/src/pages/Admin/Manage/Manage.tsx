import Header from "../../../components/Header/Header";
import * as Global from "../../../shared/Global/style.styles";

import Footer from "../../../components/Footer/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Styled from "../../../components/Advertisement/style.styles";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Manage = () => {
  const [reportedOffers, setReportedOffers] = useState([]);
  const [info, setInfo] = useState("");
  useEffect(() => {
    axios({
      method: "post",
      url: "admin.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "printReportedOffers",
        from: 0,
        amount: 20,
      },
      withCredentials: true,
    }).then((response) => {
      setReportedOffers(response.data.reportedOffers);
    });
  }, [info]);
  const { register, handleSubmit } = useForm();
  const { register: register1, handleSubmit: handleSubmit1 } = useForm();
  const deleteOffer = (data: any) => {
    axios({
      method: "post",
      url: "admin.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "deleteReportedOffers",
        postId: data.postId,
      },
      withCredentials: true,
    }).then((response) => {
      setInfo("Usunięto zgłoszenie");
    });
  };
  const banUser = (data: any) => {
    axios({
      method: "post",
      url: "admin.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "ban",
        postId: parseInt(data.postId),
      },
      withCredentials: true,
    }).then((response) => {
      setInfo("Zbanowano użytkownika");
    });
  };
  if (reportedOffers !== undefined) {
    return (
      <>
        <Header />
        <Global.Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID zgłoszenia</th>
                <th>Treść zgłoszenia</th>
                <th>ID oferty</th>
                <th>Banowanie</th>
                <th>Usuwanie</th>
              </tr>
            </thead>
            <tbody>
              {reportedOffers.map((field: any, i) => {
                return (
                  <>
                    <tr>
                      <td>{field.id}</td>
                      <td>{field.description}</td>
                      <td>{field.offerId}</td>

                      <td>
                        {" "}
                        <form onSubmit={handleSubmit1(banUser)}>
                          <input
                            {...register1("postId")}
                            value={field.offerId}
                            type="hidden"
                          />
                          <input type="submit" value="Zbanuj użytkownika" />
                        </form>
                      </td>
                      <td>
                        <form onSubmit={handleSubmit(deleteOffer)}>
                          <input
                            {...register("postId")}
                            value={field.offerId}
                            type="hidden"
                          />
                          <input type="submit" value="Usuń ogłoszenie" />
                        </form>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
          {info}
        </Global.Container>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Global.Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID zgłoszenia</th>
                <th>Treść zgłoszenia</th>
                <th>ID oferty</th>
                <th>Banowanie</th>
                <th>Usuwanie</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
          {info}
        </Global.Container>
        <Footer />
      </>
    );
  }
};

export default Manage;
