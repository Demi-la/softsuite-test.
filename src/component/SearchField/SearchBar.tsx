import React, { ReactNode } from "react";
import { useState } from "react";
import Style from "./Search.module.scss"

interface searchBarType {
  onChange?: boolean;
  value?: string;
  children?: ReactNode
  
  
}
const SearchBar: React.FC<searchBarType> = (props) => {
  const { onChange, value, children, ...rest } = props;




  return (
    <div className={Style.searchWrapper}>
      <input
        type="text"
        placeholder="Search for element"
        {...rest}
        className={Style.searchInput}
      />
      <div className={Style.searchBTN}>
        <button className={Style.button}>{children}</button>
      </div>
    </div>
  );
  
  
};

export default SearchBar;
