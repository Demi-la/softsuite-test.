import React from "react";
import Style from "./ConfirmModal.module.scss";

interface ConfirmModalType {
  icon?: React.ReactNode;
  message?: React.ReactNode;
  children?: React.ReactNode;
  buttonText?: string;
  buttonConfirmText?: string;
}

const ConfirmModal: React.FC<ConfirmModalType> = ({
  icon,
  message,
  buttonText,
  children,
  buttonConfirmText,
}) => {
  return (
    <div className={Style.modalContainer}>
      <div className={Style.modalIcon}>{icon}</div>
      <div className={Style.modalMessage}>{message}</div>
      {/* <div className={Style.modalText}>{warning}</div> */}
      {/* {children && <div className={Style.modalExtraContent}>{children}</div>}
        {buttonText && ( */}
      {children}

      {/* )} */}
    </div>
  );
};

export default ConfirmModal;
