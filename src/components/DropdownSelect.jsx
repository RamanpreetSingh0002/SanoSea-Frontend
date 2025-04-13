import React, { useState } from "react";

const DropdownSelect = ({
  defaultValue = "",
  options = [],
  onChange,
  includeLabel = false,
  labelText = "Select State",
  defaultClass,
}) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [selected, setSelected] = useState(defaultValue);

  const toggleDropdown = () => setDropdownActive(!dropdownActive);

  const handleOptionClick = option => {
    setSelected(option);
    onChange && onChange(option);
    setDropdownActive(false);
  };

  return (
    <div className={`select-menu ${dropdownActive ? "active" : ""}`}>
      <div className="select-btn" onClick={toggleDropdown}>
        <span className={"sBtn-text " + defaultClass}>
          {selected || defaultValue}
        </span>

        <i
          className={`bi bi-chevron-down ${dropdownActive ? "rotate" : ""}`}
        ></i>
      </div>

      {dropdownActive && (
        <ul className="options">
          {includeLabel && (
            <li className="option label-option" key="label">
              <span className="option-text">{labelText}</span>
            </li>
          )}
          {options.map(opt => (
            <li
              key={opt}
              className="option"
              onClick={() => handleOptionClick(opt)}
            >
              <span className="option-text">{opt}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownSelect;
