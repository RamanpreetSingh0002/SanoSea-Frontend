import React from "react";

const FormField = ({
  id,
  name,
  label,
  placeholder,
  iconClass,
  toggleVisibility,
  ...rest
}) => {
  return (
    <div className="form_field">
      <label htmlFor={id ?? name}>{label}</label>
      <input id={id ?? name} name={name} placeholder={placeholder} {...rest} />

      {iconClass && (
        <i
          className={"fa-solid icon " + iconClass}
          onClick={toggleVisibility}
        ></i>
      )}
    </div>
  );
};

export default FormField;
