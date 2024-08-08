import { Outlet } from "react-router-dom";
import "./App.css";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center padding-auto bg-custom">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
