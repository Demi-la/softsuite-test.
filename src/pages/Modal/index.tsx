import React from "react";
import Style from "./Modal.module.scss";

interface ModalType {
  icon: React.ReactNode;
  message: React.ReactNode;
  children: React.ReactNode;
  buttonText: string;
  buttonConfirmText: string;

  onButtonClick?: () => void;
}

const Modal: React.FC<ModalType> = ({
  icon,
  message,
  buttonText,
  onButtonClick,
  children,
  buttonConfirmText,
}) => {
  return (
    <div className={Style.modalContainer}>
      <div className={Style.modalContent}>
        <div className={Style.modalIcon}>{icon}</div>
        <div className={Style.modalMessage}>{message}</div>
        {/* <div className={Style.modalText}>{warning}</div> */}
        {/* {children && <div className={Style.modalExtraContent}>{children}</div>}
        {buttonText && ( */}
        <div className={Style.modalExtraContent}>{children}</div>
        <button className={Style.modalButton} onClick={onButtonClick}>
          {buttonText}
        </button>
        <button className={Style.modalButtonConfirm} onClick={onButtonClick}>
          {buttonConfirmText}
        </button>
        {/* )} */}
      </div>
    </div>
  );
};

export default Modal;
