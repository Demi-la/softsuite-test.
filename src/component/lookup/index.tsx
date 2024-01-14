import React from "react";
import { useGetLookUpValueByIdQuery } from "../../redux/api";

interface LookUpType {
  lookUpIds: string;
}
const LookUpValue: React.FC<LookUpType> = ({ lookUpIds }) => {
  const [lookupId, lookupValueId] = lookUpIds.split(" ");
  const { data, isLoading } = useGetLookUpValueByIdQuery({
    lookupId,
    lookupValueId,
  });

  return <span>{isLoading ? <i>Loading...</i> : data?.name}</span>;
};

export default LookUpValue;
