import React from "react";
import Style from "./ConfirmModal.module.scss";

interface ConfirmModalType {
  icon?: React.ReactNode;
  message?: React.ReactNode;
  children?: React.ReactNode;
}

const ConfirmModal: React.FC<ConfirmModalType> = ({
  icon,
  message,
  children,
}) => {
  return (
    <div className={Style.modalContainer}>
      <div className={Style.modalIcon}>{icon}</div>
      <div className={Style.modalMessage}>{message}</div>
      {children}
    </div>
  );
};

export default ConfirmModal;
