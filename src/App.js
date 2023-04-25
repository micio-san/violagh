import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Nav from "./Components/Nav";
import Homepage from "./Components/Homepage";
import SecondPage from "./Components/SecondPage";
import ErrorPage from "./Components/ErrorPage";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="https://micio-san.github.io/violagh"
          element={<Homepage />}
        />
        <Route path="/:id/:date" element={<SecondPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
