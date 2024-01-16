import React from "react";
import Style from "./FormInput.module.scss";
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import Select from "react-select";
import Switch from "react-switch";
import { useState } from "react";

interface FormInputType extends Partial<UseFormRegisterReturn> {
  inputType?: string;
  defaultValue?: string;
  placeholder?: string;
  error?: any;
  label: string;
  options?: { value: string; label: string }[];
  checked?: boolean;
  onSelectDate?: (date: Date) => void;
  selected?: any;
  onSelect?: any;
  className?: string;
}
const FormInput: React.FC<FormInputType> = ({
  inputType = "text",
  label,
  defaultValue,
  placeholder,
  error,
  options,
  onSelectDate,
  selected,
  onSelect,
  className,
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
                  className={`${Style.selectInput} ${className}`}
                />
              );
            case "selectTextArea":
              return (
                <Select
                  options={options}
                  {...rest}
                  onChange={(value) => {
                    console.log(value);
                    rest.onChange?.({ target: { value } });
                  }}
                  className={Style.selectTextArea}
                />
              );
            case "date":
              return (
                <input
                  // options={options}
                  {...rest}
                  // onChange={(value) => {
                  //   console.log(value);
                  //   rest.onChange?.({ target: { value } });
                  // }}
                  // selected={selected}
                  // onSelect={onSelect}
                  // onChange={onchange}
                  // className={Style.selectInput}
                  type="date"
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

            case "switch":
              return <input type="text" />;

            default:
              return <input defaultValue={defaultValue} {...rest} />;
          }
        })()}
        {error && <span>{error.message || error.type}</span>}
      </div>
    </div>
  );
};

export default FormInput;
