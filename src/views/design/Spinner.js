import React from "react";
import "./styling/spinner.css";

export const Spinner = () => {
  return (
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
