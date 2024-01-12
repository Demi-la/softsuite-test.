import React from 'react'
import Style from "./Element.module.scss"
import Button from '../Button'
import { FiPlus } from "react-icons/fi";
import SearchBar from '../SearchField/SearchBar';
import { CiSearch } from "react-icons/ci";

interface elementType {
  //
}

const Element: React.FC <elementType> = () => {
  return (
    <div className={Style.contentWrapper}>
     
      <Button icon={<FiPlus/>}>Create Element</Button>
      <SearchBar children={<CiSearch/>} />
    </div>
  )
}

export default Element

