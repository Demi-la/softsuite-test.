import React from "react";
import Style from "./Element.module.scss";
import Button from "../Button";
import { FiPlus } from "react-icons/fi";
import SearchBar from "../SearchField/SearchBar";
import { CiSearch } from "react-icons/ci";
import FilterBtn from "../../Assets/FilterBtn.svg";
import Mdata from "../../MOCK_DATA.json";
import Table from "./Table";
import { useMemo } from "react";
import { Data } from "./Data";
import actionButton from "../../Assets/actionButton.svg"
import { ColumnDef, Row } from "@tanstack/react-table";
interface ElementType {
}

const Element: React.FC<ElementType> = () => {
  const data = useMemo(() => Data, []);
  /** @type import('@tanstack/react-table').ColumnDef<any> */
  /** @type import('@tanstack/react-table').ColumnDef<any> */

     const elementColumns: ColumnDef<object>[] = [
       {
         header: "Name",
         accessorKey: "name",
       },
       {
         header: "Element Category",
         accessorKey: "category",
       },
       {
         header: "Element Classification",
         accessorKey: "classification",
       },
       {
         header: "Status",
         accessorKey: "status",
       },
       {
         header: "Date & Time Modified",
         accessorKey: "Date",
       },
       {
         header: "Modified By",
         accessorKey: "modifield",
       },
       {
         header: "Action",
         cell: info => (
           <img src={actionButton} alt="Action" className={Style.actionImage} />
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
      <Table data={data} columns={elementColumns} />
    </div>
  );
};

export default Element;
