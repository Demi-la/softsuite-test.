import React from "react";
import Style from "./CreateElement.module.scss";
import ReactModal from "react-modal";
import {
 Check
} from "../../media";
interface CreateElementType {
  children: React.ReactNode;
  isOpen: boolean;
  onCloseModal: (isOpen: boolean) => void;
  title?: string;
  steps: string[];
  stepperCurrentStep?: any;
}

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  content: {
    inset: "70px",
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
  steps,
  stepperCurrentStep,
}) => {
  console.log(stepperCurrentStep);

  return (
    <ReactModal isOpen={isOpen} style={modalStyle}>
      <div className={Style.container}>
        <div className={Style.header}>
          {title && <h2 className={Style.modalTitle}>{title}</h2>}
          <span onClick={() => onCloseModal(false)} className={Style.span}>
            X
          </span>
        </div>
        <div className={Style.stepperContainer}>
          {steps.map((step, index) => (
            <div key={index} className={Style.stepperWrapper}>
              <div className={Style.stepperContent}>{step}</div>
              <div className={Style.stepper}></div>
              <div className={Style.stepper}>
                {stepperCurrentStep > index + 1 ? (
                  <Check/>
                ) : (
                  index + 1
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={Style.ModalContent}>{children}</div>
      </div>
    </ReactModal>
  );
};

export default CreateElement;
