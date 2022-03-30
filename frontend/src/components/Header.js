import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../Context";
import { removeUserSession } from "../utils";
function Header() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const { isAuth, loading } = state;
  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: null });
    dispatch({ type: "SET_IS_AUTH", payload: false });
    removeUserSession();
    navigate("/");
  };
  return (
    <header>
      <nav>
        <Link to={"/"}>
          <h1>Min-link</h1>
        </Link>
        {!loading && (
          <div>
            {!isAuth && <Link to="/login">Login</Link>}
            {!isAuth && <Link to="/register">Register</Link>}
            {isAuth && (
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
