import React from "react";
import CircularLoader from "../loader/circular-loader";

export default SubmitButton = ({
  type = "submit",
  isLoading,
  onClick,
  className,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-primary ${className}`}
    >
      {isLoading && <CircularLoader />}
      {children}
    </button>
  );
};
