import React from "react";
import Style from "./Layout.module.scss";
import { IoMdSettings } from "react-icons/io";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const Nav = () => {
  return (
    <nav className={Style.nav}>
      <ul className={Style.navList}>
        <li className={Style.navElement}>
          <IoMdSettings className={Style.settingIcon} />
          <p className={Style.elementText}>Element</p>
          {/* <SlArrowUp className={Style.arrowUpIcon} /> */}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
