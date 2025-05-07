import React, { useState } from "react";
import { useApi, useNeedPermission, useNotification } from "../../../hooks";
import { deleteUser, updateUserState } from "../../../api/admin";
import { ImSpinner3 } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";

const NeedPermissionBox = () => {
  const [busy, setBusy] = useState(false);
  const {
    isPermissionBoxOpen,
    isPermissionBoxClosing,
    actionType,
    selectedUser,
    handleClosePermissionBox,
  } = useNeedPermission();
  const { handleUserStateUpdate, handleDeleteUser, fetchUsers, fetchUser } =
    useApi();

  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const location = useLocation();
  const isUserProfile = location.pathname.startsWith("/auth/user-profile/");

  if (!isPermissionBoxOpen) return null;

  const handleConfirm = async () => {
    setBusy(true); // Set busy state to true when the button is clicked
    let response;

    if (actionType === "Delete") {
      response = await handleDeleteUser(selectedUser?._id);
      setBusy(false); // Reset busy state after the operation

      if (response.error) {
        handleClosePermissionBox();
        return updateNotification(
          "error",
          `Failed to delete user: ${response.error}`
        );
      }
    } else {
      response = await handleUserStateUpdate(selectedUser?._id, actionType);
      setBusy(false); // Reset busy state after the operation

      if (response.error) {
        handleClosePermissionBox();
        return updateNotification(
          "error",
          `Failed to update user state: ${response.error}`
        );
      }
    }
    updateNotification("success", response.message);
    handleClosePermissionBox();

    if (isUserProfile) {
      if (actionType === "Delete") navigate(-1); // Go back to the previous page
      else fetchUser(selectedUser?._id); // Fetch the updated user data
    }

    fetchUsers(); // Refresh the user list
  };

  return (
    <div className="box-overlay">
      <div className={`box-modal ${isPermissionBoxClosing ? "closing" : ""}`}>
        <div className="internal-modal">
          <p>
            Are you sure you want to {actionType.toLowerCase()}{" "}
            {selectedUser?.fullName + ` (${selectedUser?.email})`} account?
          </p>

          <div className="box-buttons mt-3">
            <button
              type="button"
              className="btn cancel-btn"
              onClick={handleClosePermissionBox}
            >
              No
            </button>

            {/* Button to confirm the action */}
            <button
              type="submit"
              className="btn add-btn"
              onClick={handleConfirm}
            >
              {busy ? <ImSpinner3 className="animate-spin" /> : "Yes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NeedPermissionBox;
