import React from "react";
import { ChildrenType } from "../../global";
import Header from "../header";

const LayoutBase = (props: ChildrenType) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default LayoutBase;
