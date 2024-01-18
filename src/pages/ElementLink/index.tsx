import React from "react";
import Style from "../Element/Element.module.scss";

interface ElementLinkType {
  //
}

const ElementLink: React.FC<ElementLinkType> = () => {
  return (
    <div className={Style.contentContainer}>
      <p className={Style.title}>Element Links</p>
    </div>
  );
};

export default ElementLink;
