import React from "react";
import logo from "./logo.svg";
import "./App.css";
import style from "./App.module.scss";
import { Route, Routes } from "react-router";
import Layout from "./component/Layout";
import Element from "./pages/Element";
import ElementLink from "./pages/ElementLink";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="" element={<Element />} />
          <Route path="element_link/:id" element={<ElementLink id/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
