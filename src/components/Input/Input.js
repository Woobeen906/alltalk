import React from "react";
import "./Input.scss";

const Input = (props) => {
  const { type, placeholder, onChange, value } = props;
  return (
    <input
      className="inputBox"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
