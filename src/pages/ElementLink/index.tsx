import React from "react";
import { useParams, Link } from "react-router-dom";
import Table from "../Element/Table";
import { ColumnDef } from "@tanstack/react-table";
import LookUpValue from "../../component/lookup";
import { useGetElementDetailsQuery } from "../../redux/api";
import { useGetElementsQuery } from "../../redux/api";
import SearchBar from "../../component/SearchField/SearchBar";
import { CiSearch } from "react-icons/ci";
import Button from "../../component/Button";
import { FiPlus } from "react-icons/fi";
import Style from "./ElementLink.module.scss";
import ElementLinkEditIcon from "../../assets/ElementLinkEditIcon.svg";
import ElementLinkDelete from "../../assets/ElementLinkDelete.svg";
interface ElementLinkType {
  id: any;
}

const elementLinKColumns: ColumnDef<object>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Sub-Organization",
  },
  {
    header: "Department",
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
    cell: (row) => <Link to={""}>View Details</Link>,
  },
  {
    header: "Action",
    cell: (info) => (
      <div className={Style.actionBTns}>
        <img src={ElementLinkEditIcon} alt="Action" />
        <img src={ElementLinkDelete} alt="Action" />
      </div>
    ),
  },
];
const ElementLink: React.FC<ElementLinkType> = () => {
  let { id } = useParams();
  const {
    data: elementDetails = [],
    error,
    isLoading,
  } = useGetElementDetailsQuery(id as string, { skip: !id });
  const { data: elements } = useGetElementsQuery();

  return elementDetails?.data ? (
    <div className={Style.contentContainer}>
      <div>
        <p className={Style.title}>Element Details</p>
        <div className={Style.ElementDetailsTableWrapper}>
          <div className={Style.ElementDetailsTable}>
            <div className={Style.name}>
              <span>Element Name</span>
              <span>{elementDetails.data.name}</span>
            </div>
            <div className={Style.Classification}>
              <span>Element Classification </span>
              <span>
                <LookUpValue
                  lookUpIds={`${elementDetails.data.classificationId} ${elementDetails.data.classificationValueId}`}
                />
              </span>
            </div>
            <div className={Style.Category}>
              <span>Element Category </span>
              <span>
                <LookUpValue
                  lookUpIds={`${elementDetails.data.categoryId} ${elementDetails.data.categoryValueId}`}
                />
              </span>
            </div>
            <div className={Style.Payrun}>
              <span>Payrun</span>
              <span>
                <LookUpValue
                  lookUpIds={`${elementDetails.data.payRunId} ${elementDetails.data.payRunValueId}`}
                />
              </span>
            </div>
            <div className={Style.Description}>
              <span>Description</span>
              <span>{elementDetails.data.description}</span>
            </div>
            <div className={Style.ReportingName}>
              <span>Reporting Name </span>
              <span>{elementDetails.data.reportingName}</span>
            </div>
            <div className={Style.StartDate}>
              <span>Effective Start Date </span>
              <span>{elementDetails.data.effectiveStartDate}</span>
            </div>
            <div className={Style.EndDate}>
              <span>Effective END Date</span>
              <span>{elementDetails.data.effectiveEndDate}</span>
            </div>
            <div className={Style.ProcessingType}>
              <span>PROCESSING TYPE </span>
              <span>{elementDetails.data.processingType}</span>
            </div>
            <div className={Style.PayFrequency}>
              <span>Pay frequency </span>
              <span>{elementDetails.data.payFrequency}</span>
            </div>
            <div className={Style.PayMonths}>
              <span>Pay Months</span>
              <span>{elementDetails.data.selectedMonths}</span>
            </div>
            <div className={Style.Prorate}>
              <span>Prorate </span>
              <span>{elementDetails.data.prorate}</span>
            </div>
            <div className={Style.Status}>
              <span>Status</span>
              <span>{elementDetails.data.effectiveEndDate}</span>
            </div>
            <div className={Style.Status}>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <p className={Style.title}>Element Links</p>
      <div className={Style.modalHeader}>
        <div className={Style.ElementLinkWrapper}>
          <div className={Style.search}>
            <SearchBar children={<CiSearch />} />
          </div>
          <Button icon={<FiPlus />}>Create Element Links</Button>
        </div>
      </div>

      <Table data={elements?.data.content || []} columns={elementLinKColumns} />
    </div>
  ) : null;
};

export default ElementLink;
