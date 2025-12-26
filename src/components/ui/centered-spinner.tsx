import React from "react";
import Spinner from "./spinner";

function CenteredSpinner() {
  return (
    <div className="flex justify-center item-center h-screen">
      <Spinner />
    </div>
  );
}

export default CenteredSpinner;
