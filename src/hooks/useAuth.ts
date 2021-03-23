import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const useAuth = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get("Logged") == "true") setIsLogged(true);
    else setIsLogged(false);
  });

  return { isLogged };
};

export default useAuth;
