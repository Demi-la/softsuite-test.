import { ColumnDef } from "@tanstack/react-table";
import ReactModal from "react-modal";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import {
  FIlterBtn,
  Action as ActionIcon,
  SuccessIcon,
  DeleteIcon,
} from "../../media";
import Action from "../../component/Action";
import Button from "../../component/Button";
import { FiPlus } from "react-icons/fi";
import CreateElement from "../../component/Modal";
import Popup from "../../component/Popop";
import SearchBar from "../../component/SearchField/SearchBar";
import LookUpValue from "../../component/lookup";
import {
  useGetElementsQuery,
  useAddElementMutation,
  useDeleteElementMutation,
} from "../../redux/api";
import Style from "./Element.module.scss";
import Table from "./Table";
import { FirstTab, SecondTab } from "./forms";
import ConfirmModal from "../../component/ConfirmModal";

interface ElementType {
  //
}

const tabs = [FirstTab, SecondTab];

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  content: {
    inset: "169px",
    overflow: "hidden",
    width: "fit-content",
    margin: "auto",
    border: "none",
    padding: "0",
  },
};

const validationTabs = [
  [
    "name",
    "classificationValueId",
    "elementCategory",
    "payrun",
    "description",
    "reportingName",
  ],
  [
    "startDate",
    "endDate",
    "processingType",
    "payFrequency",
    "payMonths",
    "Prorate",
  ],
];

const initialValues = {
  name: "",
  description: "",
  payRunId: "5",
  payRunValueId: "",
  classificationId: "2",
  classificationValueId: "",
  categoryId: "1",
  categoryValueId: "",
  reportingName: "",
  processingType: "",
  status: "",
  prorate: "",
  effectiveStartDate: "",
  effectiveEndDate: "",
  selectedMonths: [""],
  payFrequency: "",
  modifiedBy: "Adebiyi Oluwaseun Oluwademilade",
};

type FormInputTypes = {
  name: string;
  classificationValueId: string;
  elementCategory: string;
  payrun: string;
  description: string;
  reportingName: string;
};
const Element: React.FC<ElementType> = () => {
  const {
    register,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormInputTypes>({ mode: "onBlur", defaultValues: initialValues });

  const parseData = (data: any) => {
    return {
      ...data,
      selectedMonths:
        data.payFrequency === "selectedMonths" ? [data.payMonths] : [],
      status: data.status ? "active" : "inactive",
    };
  };

  const { data: elements, error, isLoading } = useGetElementsQuery();

  const [addElement, {}] = useAddElementMutation();
  const [deleteData, { isLoading: isDeleting }] = useDeleteElementMutation();

  const handleDelete = (id: string) => {
    setConfirm({
      icon: <DeleteIcon />,
      message: "Are you sure you want to delete Element?",
      type: "delete",
      id,
    });
  };

  const [tabIndex, setTabIndex] = useState(0);
  const Component = useMemo(() => tabs[tabIndex], [tabIndex]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [confirm, setConfirm] = useState<{
    icon?: React.ReactNode;
    message?: string;
    type?: "delete" | "ok";
    id?: string;
  }>({});

  const handleNext = async (nextIndex: number) => {
    if (nextIndex === -1) {
      setModalOpen(false);
    }

    const isDataValid =
      nextIndex < tabIndex
        ? true
        : await trigger(validationTabs[nextIndex - 1] as any);
    if (!isDataValid) {
      return;
    } else {
      if (nextIndex === tabs.length) {
        addElement(parseData(getValues()))
          .then((_) => {
            setModalOpen(false);
            setConfirm({
              icon: <SuccessIcon />,
              message: "Element has been created successfully",
              type: "ok",
            });
          })
          .catch((error: any) => {
            console.error(error.message);
          });
      } else {
        setTabIndex(nextIndex);
      }
    }
  };

  const elementColumns: ColumnDef<any>[] = [
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
      cell: (info) => (
        <span
          className={
            (info.getValue() as string) === "active"
              ? `${Style.activeBackground}`
              : `${Style.inactiveBackground}`
          }
        >
          {(info.getValue() as string) === "active" ? "active" : "inactive"}
        </span>
      ),
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
      accessorFn: (row) => row.id,
      cell: (info) => (
        <Popup
          content={
            <Action
              handleDelete={handleDelete}
              id={info.getValue() as string}
            />
          }
        >
          <ActionIcon className={Style.actionImage} />
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
            <FIlterBtn />
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
          <Component
            register={register}
            errors={errors}
            next={handleNext}
            setValue={setValue}
            getValues={getValues}
            defaultValues={getValues()}
          />
        </form>
      </CreateElement>
      <ReactModal isOpen={!!confirm.message} style={modalStyle}>
        <ConfirmModal icon={confirm.icon} message={confirm.message}>
          <div className={Style.btnWrapper}>
            <Button
              onClick={() => setConfirm({})}
              className={`${
                confirm.type === "delete" ? Style.confirmBtn : Style.fullBtn
              }`}
            >
              {confirm.type === "delete" ? "Cancel" : "Close to continue"}
            </Button>
            {confirm.type === "delete" && (
              <Button
                onClick={() =>
                  deleteData(confirm.id!).then((_) =>
                    setConfirm({
                      icon: <DeleteIcon />,
                      message: "Element has been deleted successfully",
                      type: "ok",
                    })
                  )
                }
                className={Style.deleteBtn}
                loading={isDeleting}
                disabled={isDeleting}
              >
                Yes Delete
              </Button>
            )}
          </div>
        </ConfirmModal>
      </ReactModal>
    </div>
  );
};

export default Element;
