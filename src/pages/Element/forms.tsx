import React, { useState } from "react";
import FormInput from "../../component/FormInput";
import {
  DeepMap,
  FieldError,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import Style from "./Forms.module.scss";
import Select from "react-select";
import Button from "../../component/Button";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface TabType {
  register: UseFormRegister<{ [key: string]: any }>;
  errors: DeepMap<FieldValues, FieldError>;
  next: (tabIndex: number) => void;
  // placeholder: string;
}
interface IFormInput {
  name: string;
  elementClassification: string;
  elementCategory: string;
  payrun: string;
  description: string;
  reportingName: string;
}

export const FirstTab: React.FC<TabType> = ({ register, errors, next }) => {
  console.log(errors);
  return (
    <div>
      {/* <form> */}
        <div className={Style.wrapper}>
          <FormInput
            label="Name"
            error={errors["name"]}
            {...register("name", { required: true, maxLength: 20 })}
            placeholder="Input"
          />

          <FormInput
            label="Element Classification"
            {...register("elementClassification", {
              required: "Element classification is required",
            })}
            placeholder="Select Classification"
            error={errors["elementClassification"]}
            inputType="select"
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" },
            ]}
          />
          <FormInput
            label="Element Category"
            {...register("elementCategory", {
              required: "Element category is required",
            })}
            placeholder="Select Element Category"
            error={errors["elementCategory"]}
            inputType="select"
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" },
            ]}
          />
          <FormInput
            label="Payrun"
            {...register("payrun", {
              required: "Element category is required",
            })}
            placeholder="Select Payrun"
            error={errors["payrun"]}
            inputType="select"
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
            ]}
          />
        </div>

        <FormInput
          label="Description"
          {...register("description", {
            required: "Description is required",
          })}
          placeholder="Input Description"
          error={errors["description"]}
          inputType="textarea"
        />

        <FormInput
          label="Reporting Name"
          {...register("reportingName", {
            required: "Reporting name is required",
          })}
          placeholder="Input Reporting Name "
          error={errors.reportingName?.message}
          inputType="textarea"
        />
        <Button
          className={Style.formNextBtn}
          type="button"
          onClick={() => {
            
          return next(1)}}
        >
          Next
        </Button>
        {/* <input type="submit"/> */}
        {/* <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(submitData)(e);
            console.log("Button Clicked");
          }}
        >
          submit
        </button> */}
        {/* <Button type="button" className={Style.formNextBtn}>
          Cancel
        </Button> */}
      {/* </form> */}
    </div>
  );
};

export const SecondTab: React.FC<TabType> = ({ register, errors, next }) => {
  //   const [currentForm, setCurrentForm] = useState(1);
  //  const handleBack = () => {
  //   if (currentForm > 1) {
  //     setCurrentForm(currentForm - 1);
  //   }
  return (
    <div>
      <div className={Style.wrapper}>
        <FormInput
          label="Effective Start Date"
          {...register("startDate")}
          placeholder="Select Data"
          error={errors["startDate"]}
          inputType="date"
          // selected={startDate}
          // onSelect={setStartDate}
          // onChange={setStartDate}
        />
        <FormInput
          label="Effective End Date"
          {...register("endDate")}
          placeholder="Select Data"
          error={errors["endDate"]}
          inputType="date"
          // selected={startDate}
          // onSelect={setStartDate}
          // onChange={setStartDate}
        />

        <FormInput
          label="Processing Type"
          {...register("ProcessingType")}
          error={errors["processingType"]}
          inputType="radio"
          options={[
            { value: "Open", label: "Open" },
            { value: "Close", label: "Close" },
          ]}
        />
        <FormInput
          label="Pay Frequency"
          {...register("payFrequency")}
          // placeholder="Select Payrun"
          error={errors["payFrequency"]}
          inputType="radio"
          options={[
            { value: "Monthly", label: "Monthly" },
            { value: "Selected Months", label: "Selected Months" },
          ]}
        />
      </div>

      <FormInput
        label="Selected Pay Months"
        {...register("payMonths")}
        placeholder="Select"
        error={errors["payMonths"]}
        inputType="selectTextArea"
        options={[
          { value: "chocolate", label: "Chocolate" },
          { value: "strawberry", label: "Strawberry" },
          { value: "vanilla", label: "Vanilla" },
        ]}
      />
      <div className={Style.wrapper}>
        <FormInput
          label="Prorate"
          {...register("Prorate")}
          error={errors["prorate"]}
          inputType="radio"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />
      </div>
      <Button
        type="button"
        className={Style.formNextBtn}
        onClick={() => next(0)}
      >
        Back
      </Button>
      <Button
        onClick={() => next(2)}
        type="button"
        className={Style.formNextBtn}
      >
        Submit
      </Button>
    </div>
  );
};
