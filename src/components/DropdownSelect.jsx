import React, { useState, useEffect, useRef } from "react";
import { useNeedPermission, useNotification } from "../hooks";

const DropdownSelect = ({
  user,
  onOpen,
  defaultValue,
  patientSelect = false,
  options = [],
  onChange,
  includeLabel = false,
  labelText = "Select State",
  defaultClass = "",
  index,
  activeDropdownIndex,
  setActiveDropdownIndex,
  ...rest
}) => {
  const [dropdownDirection, setDropdownDirection] = useState("down"); // Track dropdown position
  const [selected, setSelected] = useState(defaultValue); // Default empty, filled on load
  const dropdownRef = useRef(null); // Reference for dropdown

  const { handleOpenPermissionBox } = useNeedPermission();
  const { updateNotification } = useNotification();

  const isActive = activeDropdownIndex === index;

  const isEdit = user?.role === "Doctor" || user?.role === "Patient";

  useEffect(() => {
    setSelected(defaultValue); // Apply default value on mount
  }, [defaultValue]);

  const toggleDropdown = () => {
    setActiveDropdownIndex(isActive ? null : index);

    // Adjust dropdown direction
    setTimeout(() => {
      adjustDropdownPosition();
    }, 0);
  };

  const handleOptionClick = option => {
    if (option === user?.state) {
      // Show warning if the selected option is the same as stored state
      setActiveDropdownIndex(null);
      return updateNotification(
        "warning",
        `${
          user?.fullName + ` (${user?.email})`
        } is already ${option.toLowerCase()} account`
      );
    }

    if (option === "Active" || option === "Deactive") {
      handleOpenPermissionBox(option, user); // Open permission modal with selected option
    } else if (option === "Edit") {
      onOpen(user); // Open edit modal with user data
    } else {
      setSelected(option);
    }
    // setSelected(option);
    onChange && onChange(option);
    setActiveDropdownIndex(null);
  };

  // Adjust dropdown positioning dynamically
  const adjustDropdownPosition = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < 150 && spaceAbove > 150) {
        setDropdownDirection("up"); // Open dropdown upwards if needed
      } else {
        setDropdownDirection("down"); // Default dropdown position
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (!event.target.closest(".select-menu")) {
        setActiveDropdownIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Check if the dropdown is inside a form
  // const isInsideForm = dropdownRef.current?.closest("form");

  return (
    <div
      className={`select-menu ${isActive ? "active" : ""}`}
      ref={dropdownRef}
    >
      {!patientSelect && (
        <div
          className={`select-btn ${
            selected?.startsWith("Select") ? "default-color" : "selected-color"
          }`}
          onClick={toggleDropdown}
        >
          <span className={"sBtn-text " + defaultClass}>{selected}</span>

          <i className={`bi bi-chevron-down ${isActive ? "rotate" : ""}`}></i>
        </div>
      )}

      {isActive && (
        <ul className={`options options-${dropdownDirection}`} {...rest}>
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
          {isEdit && (
            <li
              key="Edit"
              className="option"
              onClick={() => handleOptionClick("Edit")}
            >
              <span className="option-text">Edit</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default DropdownSelect;
