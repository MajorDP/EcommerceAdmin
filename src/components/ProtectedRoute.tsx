import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { checkSession } from "../api/auth";
import Spinner from "./Spinner";

function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  //IF USER NOT AUTHENTICATED, REDIRECT TO LOGIN
  useEffect(
    function () {
      const user = checkSession();
      if (!user) {
        navigate("/login");
      }
      setIsLoading(false);
    },
    [navigate]
  );

  if (isLoading) {
    return (
      <div className="flex flex-row items-center justify-center w-full h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex flex-row">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
