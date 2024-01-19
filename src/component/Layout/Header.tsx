import React from "react";
import Style from "./Layout.module.scss";
import {
Logo,
Notification,
User
} from "../../media";


interface HeaderType {}

const Header: React.FC<HeaderType> = () => {
  console.log(Style);
  return (
    <header className={Style.header}>
      <Logo className={Style.logo} />

      <div className={Style.profileDetails}>
        <Notification
          className={Style.notificationBell}
        />
        <User className={Style.profilePicture} />
        <div>
          <p className={Style.profileName}>Henry Okoro</p>
          <p className={Style.profileRole}>Payroll Manager</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
