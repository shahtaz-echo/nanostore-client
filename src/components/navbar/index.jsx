import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearCookies, parseCookies, parseJwt } from "../../utiles/cookies";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const { user_id } = parseJwt() || {};
  const cookies = parseCookies();
  const accessToken = cookies["access_token"];

  const handleLogout = () => {
    clearCookies();
    navigate("/sign-in");
  };

  useEffect(() => {
    if (user_id) {
      fetch(`http://127.0.0.1:8000/api/user/${user_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [user_id]);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-orange-500 text-xl font-semibold">
            nanostore
          </Link>
          <Link to="/admin">Admin</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/products" className="mr-8">
            Products
          </Link>
          {!user_id ? (
            <div className="flex gap-2">
              <Link to="/sign-in" className="px-5 py-2 text-black border">
                Login
              </Link>
              <Link
                to="/sign-up"
                className="bg-black px-5 py-2 text-white border"
              >
                Create Account
              </Link>
            </div>
          ) : (
            <div>
              <button
                onClick={handleLogout}
                className="bg-black px-5 py-2 text-white border"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
