import React from "react";
import FormInput from "../../component/FormInput";
import { UseFormRegister } from "react-hook-form";
import Style from "./Forms.module.scss";
import Select from "react-select";

interface TabType {
  register: UseFormRegister<{ [key: string]: any }>;
  errors: any;
}

export const FirstTab: React.FC<TabType> = ({ register, errors }) => {
  return (
    <div>
      <div className={Style.wrapper}>
        <FormInput
          label="Name"
          {...register("name")}
          placeholder="Input"
          error={errors["name"]}
        />
        <FormInput
          label="Element Classification"
          {...register("classification")}
          placeholder="Select Classification"
          error={errors["classification"]}
          inputType="select"
          options={[
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
            { value: "vanilla", label: "Vanilla" },
          ]}
        />
        <FormInput
          label="Element Category"
          {...register("category")}
          placeholder="Select Element Category"
          error={errors["category"]}
          inputType="select"
          options={[
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
            { value: "vanilla", label: "Vanilla" },
          ]}
        />
        <FormInput
          label="Payrun"
          {...register("payrun")}
          placeholder="Select Payrun"
          error={errors["payrun"]}
          inputType="radio"
          options={[
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
          ]}
        />
      </div>

      <FormInput
        label="Description"
        {...register("description")}
        placeholder="Input Description"
        error={errors["description"]}
        inputType="textarea"
      />

      <FormInput
        label="Reporting Name"
        {...register("reporting")}
        placeholder="Input Reporting Name "
        error={errors["reporting"]}
        inputType="textarea"
      />
    </div>
  );
};
