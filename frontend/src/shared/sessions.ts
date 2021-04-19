import Cookies from "universal-cookie";

export const getSessionCookie: any = () => {
  const sessionCookie = new Cookies();
  if (sessionCookie.get("PHPSESSID") != undefined) {
    return sessionCookie.get("PHPSESSID");
  } else {
    return false;
  }
};
