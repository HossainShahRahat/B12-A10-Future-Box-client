import React from "react";
import "./App.css";
import Navbar from "./Components/Header/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
