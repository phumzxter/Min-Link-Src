import React, { useContext } from "react";
import AppContext from "../Context";
import Header from "./Header";

function AppLayout({ children }) {
  const { state } = useContext(AppContext);
  return (
    <div className="layout">
      <Header />
      <main>{state.loading ? <h2>Loading...</h2> : children}</main>
    </div>
  );
}

export default AppLayout;
