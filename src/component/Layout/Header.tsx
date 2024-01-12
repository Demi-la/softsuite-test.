import React from 'react'
import Style  from "./Layout.module.scss"
import Logo from "../../Assets/Logo.svg"
import Notification from "../../Assets/Notification.svg"
import Henry from "../../Assets/Henry.png"

interface HeaderType {
}

const Header: React.FC<HeaderType> = () => {
  console.log(Style)
  return (
    <div className={Style.header}>
      <img src={Logo} alt="SoftSuite Logo" className={Style.logo} />

      <div className={Style.profileDetails}>
        <img
          src={Notification}
          alt="Notification"
          className={Style.notificationBell}
        />
        <img src={Henry} alt="Profile" className={Style.profilePicture} />
        <div>
          <p className={Style.profileName}>Henry Okoro</p>
          <p className={Style.profileRole}>Payroll Manager</p>
        </div>
      </div>
    </div>
  );
}

export default Header
