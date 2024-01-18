import React, { ReactNode } from "react";
import Style from "./Button.module.scss";
interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  loading?: boolean;
  btnType?: "primary" | "secondary";
}

const Button: React.FC<ButtonType> = (props) => {
  const {
    children,
    icon,
    btnType = "primary",
    className = "",
    loading,
    ...rest
  } = props;
  return (
    <button {...rest} className={`${Style.btn} ${Style[btnType]} ${className}`}>
      {loading ? (
        <i>Loading...</i>
      ) : (
        <>
          {children} {icon}
        </>
      )}
    </button>
  );
};

export default Button;
