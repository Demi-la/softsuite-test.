import React from "react";
import Style from "./Popup.module.scss";
import { useState } from "react";

interface PopupType {
  children: React.ReactNode;
  content: React.ReactNode;
}
const Popup: React.FC<PopupType> = ({ children, content }) => {
  const [show, setShow] = useState(false);
  return (
    <div className={Style.popupModal}>
      <span onClick={() => setShow(!show)}>{children}</span>
      <div className={`${Style.popupContent} ${show ? Style.show : ""}`}>
        {content}
      </div>
    </div>
  );
};

export default Popup;
