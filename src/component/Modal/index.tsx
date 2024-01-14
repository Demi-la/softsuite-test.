import React from "react";
import Style from "./CreateElement.module.scss";
import Modal from "react-modal";
import ReactModal from "react-modal";
import { useState } from "react";
interface CreateElementType {
  children: React.ReactNode;
  isOpen: boolean;
  onCloseModal: (isOpen: boolean) => void;
  title?: string;
}

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  content: {
    inset: "50px",
    width: "50rem",
    margin: "auto",
    border: "none",
    padding: "0",
  },
};
const CreateElement: React.FC<CreateElementType> = ({
  children,
  isOpen,
  onCloseModal,
  title,
}) => {
  return (
    <ReactModal isOpen={isOpen} style={modalStyle}>
      <div className={Style.container}>
        <div className={Style.header}>
          {title && <h2 className={Style.modalTitle}>{title}</h2>}
          <span onClick={() => onCloseModal(false)} className={Style.span}>
            X
          </span>
        </div>
        <div className={Style.ModalContent}>{children}</div>
      </div>
    </ReactModal>
  );
};

export default CreateElement;
