import Header from "../../components/Header/Header";
import * as Global from "../../shared/Global/style.styles";
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  NavItem,
  Table,
} from "react-bootstrap";
import * as Styled from "../User/style.styles";
import ChangePasswordForm from "../../components/Forms/ChangePasswordForm/ChangePasswordForm";
import ChangeEmailForm from "../../components/Forms/ChangeEmailForm/ChangeEmailForm";
import ChangeUserDetailsForm from "../../components/Forms/ChangeUserDetailsForm/ChangeUserDetailsForm";
import Footer from "../../components/Footer/Footer";
import React, { useEffect, useState } from "react";
import { Link } from "react-feather";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";
import OfferBlock from "../../components/Offers/OfferBlock/OfferBlock";

interface IMessages {
  lastMsgContent: string;
  lastMsgDate: string;
  offerTitle: string;
  person: string;
  unread: string;
  convId: string;
}

const Messages = () => {
  const defaultMessages: IMessages[] = [];
  const [messages, setMessages]: [
    IMessages[],
    (messages: IMessages[]) => void
  ] = useState(defaultMessages);
  const [messagesToOffers, setMessagesToOffers]: [
    IMessages[],
    (messages: IMessages[]) => void
  ] = useState(defaultMessages);
  let message = {};

  useEffect(() => {
    axios({
      method: "post",
      url: "contact.php",
      data: {
        action: "printChats",
      },
      withCredentials: true,
    }).then((response) => {
      let temp = [];
      let temp_anotherOffer = [];
      for (let i = 0; i < response.data.convsOrMsgs.toNotMyOffers.length; i++) {
        temp_anotherOffer.push({
          lastMsgContent:
            response.data.convsOrMsgs.toNotMyOffers[i]["lastMsgContent"],
          lastMsgDate: new Date(
            response.data.convsOrMsgs.toNotMyOffers[i]["lastMsgDate"] * 1000
          ).toLocaleString("pl-PL"),
          offerTitle: response.data.convsOrMsgs.toNotMyOffers[i]["offerTitle"],
          person: response.data.convsOrMsgs.toNotMyOffers[i]["person"],
          unread: response.data.convsOrMsgs.toNotMyOffers[i]["unread"],
          convId: response.data.convsOrMsgs.toNotMyOffers[i]["id"],
        });
      }
      setMessagesToOffers(temp_anotherOffer);

      for (let i = 0; i < response.data.convsOrMsgs.toMyOffers.length; i++) {
        temp.push({
          lastMsgContent:
            response.data.convsOrMsgs.toMyOffers[i]["lastMsgContent"],
          lastMsgDate: new Date(
            response.data.convsOrMsgs.toMyOffers[i]["lastMsgDate"] * 1000
          ).toLocaleString("pl-PL"),
          offerTitle: response.data.convsOrMsgs.toMyOffers[i]["offerTitle"],
          person: response.data.convsOrMsgs.toMyOffers[i]["person"],
          unread: response.data.convsOrMsgs.toMyOffers[i]["unread"],
          convId: response.data.convsOrMsgs.toMyOffers[i]["id"],
        });
      }

      setMessages(temp);
    });
  }, []);

  return (
    <>
      <Header />
      <Global.Container>
        <Breadcrumb>
          <LinkContainer to="/mojekonto" exact>
            <Breadcrumb.Item>Moje konto</Breadcrumb.Item>
          </LinkContainer>
          <LinkContainer to="/wiadomosci" exact>
            <Breadcrumb.Item active>Wiadomości</Breadcrumb.Item>
          </LinkContainer>
        </Breadcrumb>
        <Styled.Box>
          <Styled.Content>
            <Table bordered={false} striped hover>
              <thead>
                <tr>
                  <th>Użytkownik</th>
                  <th colSpan={2}>Treść</th>
                  <th>Ogłoszenie</th>
                  <th>Wysłano</th>
                  <th>Powiadomienia</th>
                  <th>Czytaj</th>
                </tr>
              </thead>

              <tbody>
                {messagesToOffers.map((message: IMessages) => {
                  return (
                    <tr>
                      <td>{message.person}</td>
                      <td colSpan={2}>{message.lastMsgContent}</td>
                      <td>{message.offerTitle}</td>
                      <td>{message.lastMsgDate}</td>
                      <td>
                        {parseInt(message.unread) > 0 ? (
                          <Alert variant="danger">
                            Masz nieprzeczytaną wiadomość
                          </Alert>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>
                        <NavLink to={"/konwersacja" + message.convId}>
                          Czytaj
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
                {messages.map((message: IMessages) => {
                  return (
                    <>
                      <tr>
                        <td>{message.person}</td>
                        <td colSpan={2}>{message.lastMsgContent}</td>
                        <td>{message.offerTitle}</td>
                        <td>{message.lastMsgDate}</td>
                        <td>
                          {parseInt(message.unread) > 0 ? (
                            <Alert variant="danger">
                              Masz nieprzeczytaną wiadomość
                            </Alert>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>
                          <NavLink to={"/konwersacja" + message.convId}>
                            Czytaj
                          </NavLink>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </Styled.Content>
        </Styled.Box>
        <Footer />
      </Global.Container>
    </>
  );
};

export default Messages;
