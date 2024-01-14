import React, { Children } from "react";
import Style from "./Element.module.scss";
import Button from "../Button";
import { FiEye, FiPlus } from "react-icons/fi";
import SearchBar from "../SearchField/SearchBar";
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
import Popup from "../Popop";
import Action from "../Action";
import Modal from "../Modal";
import ModalDeleteIcon from "../../assets/ModalDeleteIcon.svg";
interface ElementType {
  //
}

const Element: React.FC<ElementType> = () => {
  const { data: elements, error, isLoading } = useGetElementsQuery();

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
          <Button icon={<FiPlus />}>Create Element</Button>
        </div>
      </div>
      <Table data={elements?.data.content || []} columns={elementColumns} />
      {/* <Modal
        icon={
          <>
            <img src={ModalDeleteIcon} alt="Delete Icon" />
          </>
        }
        message={<p>Are you sure you want to delete Element ?</p>}
        buttonText="Cancel"
        buttonConfirmText="Yes, Delete"
      >
        You can’t reverse this action
      </Modal> */}
    </div>
  );
};

export default Element;
