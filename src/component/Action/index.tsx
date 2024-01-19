import React from "react";
import { Edit, Delete, Eye } from "../../media";
import Style from "../Popop/Popup.module.scss";
import { Link } from "react-router-dom";

const Action = ({ id, handleDelete }: any) => {
  return (
    <div className={Style.actionPopup}>
      <Link to={`/element_link/${id}`}>
        <div className={Style.view}>
          <Eye />
          <p>View Element Links</p>
        </div>
      </Link>
      <div className={Style.edit}>
        <Edit />
        <p>Edit Element</p>
      </div>
      <div className={Style.delete} onClick={() => handleDelete(id)}>
        <Delete />
        <p>Delete Element</p>
      </div>
    </div>
  );
};

export default Action;
