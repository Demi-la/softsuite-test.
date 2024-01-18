import React, { HTMLAttributes } from "react";
import Style from "./FormInput.module.scss";
import {
  useForm,
  SubmitHandler,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import Select from "react-select";
import Switch from "react-switch";
import { useState } from "react";

interface FormInputType extends Partial<UseFormRegisterReturn> {
  inputType?: string;
  defaultValue?: string;
  placeholder?: string;
  setValue: UseFormSetValue<any>;
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
  setValue,
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
              console.log(defaultValue, "KKKKKK");
              return (
                <textarea
                  defaultValue={defaultValue}
                  {...rest}
                  onChange={(e) => setValue(rest.name!, e.target.value)}
                  className={Style.descriptionText}
                />
              );
            case "select":
              return (
                <Select
                  options={options}
                  defaultValue={options?.find(
                    (item) => item.value === defaultValue
                  )}
                  {...rest}
                  onChange={(option) => setValue(rest.name!, option?.value)}
                  className={`${Style.selectInput} ${className}`}
                />
              );
            case "selectTextArea":
              return (
                <Select
                  options={options}
                  {...rest}
                  onChange={(option) => {
                    console.log(option);
                    setValue(rest.name!, option?.value);
                  }}
                  className={Style.selectTextArea}
                />
              );
            case "date":
              return (
                <input
                  {...rest}
                  type="date"
                  onChange={(e) => setValue(rest.name!, e.target.value)}
                />
              );
            case "radio":
              return (
                <div className={Style.radioWrapper}>
                  {options?.map((option, index) => (
                    <label key={`radio-${index}`}>
                      <input
                        type="radio"
                        {...rest}
                        {...(defaultValue === option.value
                          ? { defaultChecked: true }
                          : {})}
                        onChange={() => {
                          setValue(rest.name!, option.value);
                        }}
                        // onSelect={() => setValue(rest.name!, option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              );

            case "switch":
              return <input type="text" />;

            default:
              return (
                <input
                  defaultValue={defaultValue}
                  {...rest}
                  onChange={(e) => setValue(rest.name!, e.target.value)}
                />
              );
          }
        })()}
        {error && (
          <span style={{ color: "red" }}>{error.message || error.type}</span>
        )}
      </div>
    </div>
  );
};

export default FormInput;
