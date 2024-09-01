import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseCookies, parseJwt } from "../utiles/cookies";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const cookies = parseCookies();
  const accessToken = cookies["access_token"];

  useEffect(() => {
    if (!accessToken) {
      navigate("/sign-in");
    }
  }, [accessToken, navigate]);

  return accessToken ? children : null;
};

export default PrivateRoute;
