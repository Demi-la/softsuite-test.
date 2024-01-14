import React from "react";
import { LuEye } from "react-icons/lu";
import Edit from "../../assets/Edit.svg";
import Delete from "../../assets/Delete.svg";
import Eye from "../../assets/Eye.svg";
import Style from "../Popop/Popup.module.scss";

const Action = () => {
  return (
    <div className={Style.actionPopup}>
      <div className={Style.view}>
        <img src={Eye} alt="Edit" />
        <p>View Element Links</p>
      </div>
      <div className={Style.edit}>
        <img src={Edit} alt="Edit" />
        <p>Edit Element</p>
      </div>
      <div className={Style.delete}>
        <img src={Delete} alt="Delete" />
        <p>Delete Element</p>
      </div>
    </div>
  );
};

export default Action;
