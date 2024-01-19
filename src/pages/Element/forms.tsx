import React from "react";
import FormInput from "../../component/FormInput";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import Style from "./Forms.module.scss";
import Button from "../../component/Button";
import {
  useAddElementMutation,
  useGetLookUpValuesQuery,
} from "../../redux/api";

interface TabType {
  register: UseFormRegister<any>;
  errors: DeepMap<FieldValues, FieldError>;
  next: (tabIndex: number) => void;
  addElement?: typeof useAddElementMutation;
  setValue: UseFormSetValue<any>;
  defaultValues?: { [key: string]: any };
  getValues?: UseFormGetValues<any>;
}

export const FirstTab: React.FC<TabType> = ({
  register,
  errors,
  next,
  setValue,
  getValues,
  defaultValues = {},
}) => {
  const { data: elementCategories = [] } = useGetLookUpValuesQuery("1");

  const { data: elementClassification = [] } = useGetLookUpValuesQuery("2");
  const { data: payrun = [] } = useGetLookUpValuesQuery("5");

  return (
    <form>
      <div className={Style.wrapper}>
        <FormInput
          label="Name"
          setValue={setValue}
          defaultValue={defaultValues.name}
          error={errors["name"]}
          {...register("name", { required: "Name is required" })}
          placeholder="Input"
        />

        <FormInput
          label="Element Classification"
          setValue={setValue}
          {...register("classificationValueId", {
            required: "Element classification is required",
          })}
          placeholder="Select Classification"
          defaultValue={defaultValues.classificationValueId}
          error={errors["classificationValueId"]}
          inputType="select"
          options={elementClassification.map(
            (items: { name: string; id: string }) => ({
              label: items.name,
              value: items.id,
            })
          )}
        />
        <FormInput
          label="Element Category"
          setValue={setValue}
          {...register("categoryValueId", {
            required: "Element category is required",
          })}
          placeholder="Select Element Category"
          defaultValue={defaultValues.elementCategory}
          error={errors["categoryValueId"]}
          inputType="select"
          options={elementCategories.map(
            (items: { name: string; id: string }) => ({
              label: items.name,
              value: items.id,
            })
          )}
        />
        <FormInput
          label="Payrun"
          setValue={setValue}
          {...register("payRunValueId", {
            required: "Payrun is required",
          })}
          placeholder="Select Payrun"
          defaultValue={defaultValues.payrun}
          error={errors["payRunValueId"]}
          inputType="select"
          options={payrun.map((items: { name: string; id: string }) => ({
            label: items.name,
            value: items.id,
          }))}
        />
      </div>

      <div className={Style.descriptionField}>
        <FormInput
          label="Description"
          setValue={setValue}
          {...register("description", {
            required: "Description is required",
          })}
          defaultValue={defaultValues.description}
          placeholder="Input Description"
          error={errors["description"]}
          inputType="textarea"
        />
      </div>

      <FormInput
        label="Reporting Name"
        setValue={setValue}
        {...register("reportingName", {
          required: "Reporting name is required",
        })}
        placeholder="Input Reporting Name "
        defaultValue={defaultValues.reportingName}
        error={errors["reportingName"]}
        inputType="textarea"
      />
      <div className={Style.secondTabBtn}>
        <Button
          className={Style.formBackBtn}
          type="button"
          onClick={() => {
            return next(-1);
          }}
        >
          Cancel
        </Button>
        <Button
          className={Style.formNextBtn}
          type="button"
          onClick={() => {
            return next(1);
          }}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export const SecondTab: React.FC<TabType> = ({
  register,
  errors,
  next,
  setValue,
  getValues,
  defaultValues = {},
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthOptions = months.map((month, index) => ({
    value: month,
    label: month,
  }));
  return (
    <form>
      <div className={Style.wrapper}>
        <FormInput
          label="Effective Start Date"
          setValue={setValue}
          {...register("startDate", {
            required: "Effective start date is required",
          })}
          placeholder="Select Data"
          defaultValue={defaultValues.startDate}
          error={errors["startDate"]}
          inputType="date"
        />
        <FormInput
          label="Effective End Date"
          setValue={setValue}
          {...register("endDate", {
            required: "Effective end date is required",
          })}
          placeholder="Select Data"
          defaultValue={defaultValues.endDate}
          error={errors["endDate"]}
          inputType="date"
        />

        <FormInput
          label="Processing Type"
          setValue={setValue}
          {...register("ProcessingType", {
            required: "Processing type is required",
          })}
          defaultValue={defaultValues.processingType}
          error={errors["processingType"]}
          inputType="radio"
          options={[
            { value: "open", label: "Open" },
            { value: "close", label: "Close" },
          ]}
        />
        <FormInput
          label="Pay Frequency"
          setValue={setValue}
          {...register("payFrequency", {
            required: "Pay frequency is required",
          })}
          defaultValue={defaultValues.payFrequency}
          error={errors["payFrequency"]}
          inputType="radio"
          options={[
            { value: "monthly", label: "Monthly" },
            { value: "selectedMonths", label: "Selected Months" },
          ]}
        />
      </div>

      <FormInput
        setValue={setValue}
        label="Selected Pay Months"
        {...register("payMonths", {
          required: "Selected pay months is required",
        })}
        placeholder="Select"
        defaultValue={defaultValues.payMonths}
        error={errors["payMonths"]}
        inputType="selectTextArea"
        options={monthOptions}
      />
      <div className={Style.wrapper}>
        <FormInput
          label="Prorate"
          setValue={setValue}
          {...register("Prorate", {
            required: "Prorate is required",
          })}
          defaultValue={defaultValues.prorate}
          error={errors["prorate"]}
          inputType="radio"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />

        <FormInput
          label="Status"
          getValues={getValues}
          setValue={setValue}
          {...register("status", {
            required: "status is required",
          })}
          defaultValue={defaultValues.status}
          error={errors["status"]}
          inputType="switch"
        />
      </div>
      <div className={Style.secondTabBtn}>
        <Button
          type="button"
          className={Style.formBackBtn}
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
    </form>
  );
};
