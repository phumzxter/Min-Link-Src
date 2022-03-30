import axios from "axios";
import React, { useReducer, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Auth/PrivateRoute";
import AppLayout from "./components/AppLayout";
import AppContext from "./Context";
import appReducer from "./Context/appReducer";
import initialStore from "./Context/initialStore";
import Guest from "./Pages/Guest";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register";
import User from "./Pages/User";
import { BASE_URL, getToken, removeUserSession } from "./utils";

function App() {
  const [state, dispatch] = useReducer(appReducer, initialStore);

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch({ type: "SET_LOADING", payload: true });
      axios
        .get(`${BASE_URL}/verifyToken?token=${token}`)
        .then((res) => {
          dispatch({ type: "SET_USER", payload: res.data.user });
          dispatch({ type: "SET_IS_AUTH", payload: true });
          dispatch({ type: "SET_LOADING", payload: false });
        })
        .catch((err) => {
          dispatch({ type: "SET_USER", payload: null });
          dispatch({ type: "SET_IS_AUTH", payload: false });
          removeUserSession();
          dispatch({ type: "SET_LOADING", payload: false });
        });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Guest />
                </PrivateRoute>
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PrivateRoute>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PrivateRoute>
                  <Register />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
