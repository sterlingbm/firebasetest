import React from "react";
import "./styles.css";
import Login from "./Login";
import FilterableProductTable from "./FilterableProductTable";
import PRODUCTS from "./PRODUCTS";
import GetLoginData from "./GetLoginData";

export default function App() {
  return (
    <div className="App">
      <h1>Hello Fuckhead</h1>
      <Login />
      <GetLoginData />
    </div>
  );
}
