import Cookies from "universal-cookie";

export const getSessionCookie: any = () => {
  const sessionCookie = new Cookies();
  if (sessionCookie.get("logged") != undefined) {
        return sessionCookie.get("logged");
  } else {
    return false;
  }
};
