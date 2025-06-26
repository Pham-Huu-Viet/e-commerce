import React from "react";
import Styles from "./MainLayout.module.css";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";

function MainLayout() {
  return (
    <div className={Styles.MainLayout_container}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
