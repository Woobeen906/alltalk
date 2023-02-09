import React from "react";
import "./Input.scss";

const Input = (props) => {
  const { type, placeholder, onChange, name, value, error } = props;
  return (
    <input
      className={` inputBox ${error && "inputBox-error"}`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      value={value}
    />
  );
};

export default React.memo(Input);
