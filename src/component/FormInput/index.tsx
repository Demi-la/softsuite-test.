import React from "react";
import Style from "./FormInput.module.scss";
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import Select from "react-select";

interface FormInputType extends Partial<UseFormRegisterReturn> {
  inputType?: string;
  defaultValue?: string;
  placeholder?: string;
  error?: any;
  label: string;
  options?: { value: string; label: string }[];
}
const FormInput: React.FC<FormInputType> = ({
  inputType = "text",
  label,
  defaultValue,
  placeholder,
  error,
  options,
  ...rest
}) => {
  // const { register, handleSubmit, formState: { errors } } = useForm<any>();
  return (
    <div className={Style.formInputContainer}>
      <label className={Style.formLabel}>{label}</label>
      <div className={Style.formWrapper}>
        {(() => {
          switch (inputType) {
            case "textarea":
              return (
                <textarea
                  defaultValue={defaultValue}
                  {...rest}
                  className={Style.descriptionText}
                />
              );
            case "select":
              return (
                <Select
                  options={options}
                  {...rest}
                  onChange={(value) => {
                    console.log(value);
                    rest.onChange?.({ target: { value } });
                  }}
                  className={Style.selectInput}
                />
              );
            case "radio":
              return (
                <div className={Style.radioWrapper}>
                  {options?.map((option, index) => (
                    <label key={`radio-${index}`}>
                      <input type="radio" {...rest} />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              );
            case "toggle":
              return <input type="text" />;

            default:
              return <input defaultValue={defaultValue} {...rest} />;
          }
        })()}
        {error && <span>{error}</span>}
      </div>
    </div>
  );
};

export default FormInput;
