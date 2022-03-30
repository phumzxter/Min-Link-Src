import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import { BASE_URL } from "../utils";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [errorR, setErrorR] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && name) {
      setloading(true);
      setErrorR("");
      axios
        .post(`${BASE_URL}/register`, { email, password, name })
        .then((res) => {
          navigate("/login");
          setloading(false);
        })
        .catch((err) => {
          setErrorR("Something went wrong");
          setloading(false);
        });
      setloading(false);
    } else {
      setError("All fields are required");
    }
  };

  return (
    <section className="container">
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Login to you account</h2>
          {(!name || !email || !password) && error && (
            <p className="error">{error}</p>
          )}
          {errorR && <p className="error">{errorR}</p>}
          <InputField
            id="name"
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            id="email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={loading} className="submit" type="submit">
            {!!loading ? "Sending request" : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;
