import React, { Children, useMemo } from "react";
import Style from "./Element.module.scss";
import Button from "../../component/Button";
import { FiEye, FiPlus } from "react-icons/fi";
import SearchBar from "../../component/SearchField/SearchBar";
import { CiSearch } from "react-icons/ci";
import FilterBtn from "../../assets/FilterBtn.svg";
import Table from "./Table";
import actionButton from "../../assets/actionButton.svg";
import { ColumnDef } from "@tanstack/react-table";
import {
  useGetElementsQuery,
  useGetLookUpsQuery,
  useGetLookUpValueByIdQuery,
} from "../../redux/api";
import LookUpValue from "../../component/lookup";
import { useState } from "react";
import Popup from "../../component/Popop";
import Action from "../../component/Action";
import ModalDeleteIcon from "../../assets/ModalDeleteIcon.svg";
import CreateElement from "../../component/Modal";
import { FirstTab } from "./forms";
import { useForm } from "react-hook-form";
interface ElementType {
  //
}

const tabs = [FirstTab];

const Element: React.FC<ElementType> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const { data: elements, error, isLoading } = useGetElementsQuery();
  const [tabIndex, setTabIndex] = useState(0);
  const Component = useMemo(() => tabs[tabIndex], [tabIndex]);

  // const getComponent = (index: number) => tabs[index];

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const elementColumns: ColumnDef<object>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Element Category",

      accessorFn: (row: any) => `${row.categoryId} ${row.categoryValueId}`,
      cell: (info) => <LookUpValue lookUpIds={info.getValue() as string} />,
    },
    {
      header: "Element Classification",

      accessorFn: (row: any) =>
        `${row.classificationId} ${row.classificationValueId}`,
      cell: (info) => <LookUpValue lookUpIds={info.getValue() as string} />,
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Date & Time Modified",
      accessorKey: "createdAt",
    },
    {
      header: "Modified By",
      accessorKey: "modifiedBy",
    },
    {
      header: "Action",
      cell: (info) => (
        <Popup content={<Action />}>
          <img
            src={actionButton}
            alt="Action"
            className={Style.actionImage}
            // onClick={() => {
            //   setModalOpen(true);
            // }}
          />
        </Popup>
      ),
    },
  ];
  return (
    <div className={Style.contentContainer}>
      <p className={Style.title}>Elements</p>
      <div className={Style.modalHeader}>
        <div className={Style.Wrapper}>
          <div className={Style.search}>
            <SearchBar children={<CiSearch />} />
            <img src={FilterBtn} alt="Filter" />
          </div>
          <Button
            icon={<FiPlus />}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Create Element
          </Button>
        </div>
      </div>
      <Table data={elements?.data.content || []} columns={elementColumns} />

      {/* {modalOpen && <CreateElement  />} */}
      <CreateElement
        isOpen={modalOpen}
        onCloseModal={setModalOpen}
        title="Create Element"
      >
        <form onSubmit={handleSubmit(() => {})}>
          <Component register={register} errors={errors} />
        </form>
        <Button className={Style.nextBtn}>Next</Button>
      </CreateElement>

      {/* <button className={Style.modalButton} onClick={onButtonClick}>
        {buttonText}
      </button>
      <button className={Style.modalButtonConfirm} onClick={onButtonClick}>
        {buttonConfirmText}
      </button> */}
    </div>
  );
};

export default Element;
