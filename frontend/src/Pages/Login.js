import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import AppContext from "../Context";
import { BASE_URL, setUserSession } from "../utils";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      axios
        .post(`${BASE_URL}/login`, { email, password })
        .then((res) => {
          setUserSession(res.data.token, res.data.user);
          dispatch({ type: "SET_USER", payload: res.data.user });
          dispatch({ type: "SET_IS_AUTH", payload: true });
          navigate("/user");
        });
    } else {
      setError("Enter a valid url");
    }
  };

  return (
    <section className="container">
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Login to you account</h2>
          <InputField
            id="email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />
          <InputField
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            error={error}
          />
          <button className="submit" type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
