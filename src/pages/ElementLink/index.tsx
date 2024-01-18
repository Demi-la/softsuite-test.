import React, { useState } from 'react'
import Table from "../Element/Table";
import { ColumnDef } from '@tanstack/react-table';
import LookUpValue from '../../component/lookup';
import { Action } from '@reduxjs/toolkit';
import Popup from '../../component/Popop';
import Style from "../Element/Element.module.scss";

import { useGetElementsQuery, useAddElementMutation } from "../../redux/api";
import SearchBar from '../../component/SearchField/SearchBar';
import { CiSearch } from 'react-icons/ci';
import Button from '../../component/Button';
import FilterBtn from "../../assets/FilterBtn.svg";
import { FiPlus } from 'react-icons/fi';


interface ElementLinkType {
//
}

 const elementLinKColumns: ColumnDef<object>[] = [
   {
     header: "Name",
     accessorKey: "name",
   },
   {
     header: "Sub-Organization",

    //  accessorFn: (row: any) => `${row.categoryId} ${row.categoryValueId}`,
    //  cell: (info) => <LookUpValue lookUpIds={info.getValue() as string} />,
   },
   {
     header: "Department",

    //  accessorFn: (row: any) =>
    //    `${row.classificationId} ${row.classificationValueId}`,
    //  cell: (info) => <LookUpValue lookUpIds={info.getValue() as string} />,
   },
   {
     header: "Employee Category",
     accessorKey: "status",
   },
   {
     header: "Amount",
     accessorKey: "createdAt",
   },
   {
     header: "Details",
     accessorKey: "modifiedBy",
   },
   {
     header: "Action",
     cell: (info) => (
       <Popup content={""}>
         <img src="" alt="Action" />
       </Popup>
     ),
   },
 ];
const ElementLink: React.FC<ElementLinkType> = () => {
     const [modalOpen, setModalOpen] = useState<boolean>(false);
      const { data: elements, error, isLoading } = useGetElementsQuery();
  return (
    <div className={Style.contentContainer}>
      <p className={Style.title}>Element Links</p>
      <div className={Style.modalHeader}>
        <div className={Style.Wrapper}>
          <div className={Style.search}>
            <SearchBar children={<CiSearch />} />
          
          </div>
          <Button
            icon={<FiPlus />}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Create Element Links
          </Button>
        </div>
      </div>
      <Table data={elements?.data.content || []} columns={elementLinKColumns} />
    </div>
  );
};

export default ElementLink;
