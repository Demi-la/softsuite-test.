import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import FilterBtn from "../../assets/FilterBtn.svg";
import actionButton from "../../assets/actionButton.svg";
import Action from "../../component/Action";
import Button from "../../component/Button";
import CreateElement from "../../component/Modal";
import Popup from "../../component/Popop";
import SearchBar from "../../component/SearchField/SearchBar";
import LookUpValue from "../../component/lookup";
import { useGetElementsQuery } from "../../redux/api";
import Style from "./Element.module.scss";
import Table from "./Table";
import { FirstTab, SecondTab } from "./forms";
interface ElementType {
  //
}

const tabs = [FirstTab, SecondTab];

const Element: React.FC<ElementType> = () => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<any>({ mode: "onBlur" });
  const { data: elements, error, isLoading } = useGetElementsQuery();
  const [tabIndex, setTabIndex] = useState(0);
  const Component = useMemo(() => tabs[tabIndex], [tabIndex]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // const isValidData = trigger([
  //   "name",
  //   "elementClassification",
  //   "elementCategory",
  //   "payrun",
  //   "description",
  //   "reportingName",
  // ]);

  const handleNext = async (tabIndex: number) => {
    console.log("handleNext called with tabIndex:", tabIndex);
    if (tabIndex === 1) {
      const isDataValid = await trigger([
        "name",
        "elementClassification",
        "elementCategory",
        "payrun",
        "description",
        "reportingName",
      ]);
      console.log("===========================> ", isDataValid);

      if (!isDataValid) {
        if (tabs.length === tabIndex) {
          console.log("submit");
        } else {
          setTabIndex(tabIndex);
          console.log("i am going to the next tab");
        }
      } else {
        return;
      }
    } else if (tabIndex === 0) {
      setTabIndex(0);
    }
  };

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
          <img src={actionButton} alt="Action" className={Style.actionImage} />
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

      <CreateElement
        isOpen={modalOpen}
        onCloseModal={setModalOpen}
        title="Create Element"
        steps={["Element Details", "Additional Details"]}
      >
        <form>
          <Component register={register} errors={errors} next={handleNext} />
        </form>
      </CreateElement>
    </div>
  );
};

export default Element;
