import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthVerify = (props) => {
  let location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user && user.exp) {
      if (user.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location, props]);

  return <div></div>;
};

export default AuthVerify;
