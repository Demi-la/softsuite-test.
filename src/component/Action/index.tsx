import React from "react";
import Edit from "../../assets/Edit.svg";
import Delete from "../../assets/Delete.svg";
import Eye from "../../assets/Eye.svg";
import Style from "../Popop/Popup.module.scss";
import { Link } from "react-router-dom";

const Action = ({ id, handleDelete }: any) => {
  return (
    <div className={Style.actionPopup}>
      <Link to="/element_link">
        <div className={Style.view}>
          <img src={Eye} alt="Edit" />
          <p>View Element Links</p>
        </div>
      </Link>
      <div className={Style.edit}>
        <img src={Edit} alt="Edit" />
        <p>Edit Element</p>
      </div>
      <div className={Style.delete} onClick={() => handleDelete(id)}>
        <img src={Delete} alt="Delete" />
        <p>Delete Element</p>
      </div>
    </div>
  );
};

export default Action;
