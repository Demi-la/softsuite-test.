import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import { Outlet } from "react-router";
import Style from "./Layout.module.scss";

interface LayoutType {
  // children: React.ReactNode;
}

const Layout: React.FC<LayoutType> = () => {
  return (
    <div className={Style.wrapper}>
      <header>
        <Header />
      </header>
      <div>
        <nav>
          <Nav />
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
