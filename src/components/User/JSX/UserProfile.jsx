import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";

import {
  useApi,
  useAuth,
  useModal,
  useNeedPermission,
  useNotification,
  useUserForm,
} from "../../../hooks";
import BreadcrumbNav from "../../Navbar/JSX/BreadcrumbNav";
import UserHeader from "../../UserHeader";
import LabeledIconText from "../../LabeledIconText";
import DropdownSelect from "../../DropdownSelect";

import "../Style/UserProfile.css";
import UserAppointmentTable from "./UserAppointmentTable";

const UserProfile = () => {
  const { userId } = useParams();
  const { selectedUser, fetchingUser, fetchUser } = useApi();
  const { handleOpenPermissionBox } = useNeedPermission();

  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null); // Track dropdown globally

  const { handleOpenUserForm } = useUserForm(); // Use context to open UserForm
  const { updateNotification } = useNotification();

  const location = useLocation();
  const isFromSubAdmin = location.state?.fromSubAdmin;
  const isThroughModal = location.state?.throughModal || false;
  const isThroughDashboard = location.state?.throughDashboard || false;

  const isDoctor = selectedUser?.role === "Doctor";
  const isPatient = selectedUser?.role === "Patient";

  const { authInfo } = useAuth();
  const { profile } = authInfo;

  const isFromManagement =
    profile?.role === "Admin" ||
    profile?.role === "Coordinator" ||
    profile?.role === "Audit Manager";

  const isFromPatient = profile?.role === "Patient";

  const shouldShowRoleBox = (!isDoctor && !isPatient) || isFromPatient;

  const height =
    !shouldShowRoleBox && !fetchingUser && (isDoctor || isPatient) && "100%";

  const { handleCloseAudit, handleClosePort } = useModal();

  const handleOpen = () => {
    handleOpenUserForm(
      selectedUser,
      isFromSubAdmin ? "Sub Admin" : selectedUser?.role
    ); // Open UserForm with user data
  };

  useEffect(() => {
    handleCloseAudit();
    handleClosePort();
  }, []);

  const handleDelete = async () => {
    handleOpenPermissionBox("Delete", selectedUser); // Open permission modal with selected option
  };

  useEffect(() => {
    const handleFetchUser = async () => {
      const response = await fetchUser(userId); // Fetch single user data

      if (response.error) return updateNotification("error", response.error);
    };

    if (userId) {
      handleFetchUser();
    }
  }, [userId]);

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

  return (
    <>
      <main>
        <section id="doctor-profile-section" style={{ height: height }}>
          <BreadcrumbNav
            role={isFromSubAdmin ? "Sub Admin" : selectedUser?.role}
            busy={fetchingUser}
            isThroughModal={isThroughModal}
            isThroughDashboard={isThroughDashboard}
          />

          <div className="sub-admin-profile-head" style={{ height: height }}>
            {fetchingUser ? (
              <div style={{ textAlign: "center" }}>
                <ImSpinner3 className="animate-spin" />
                <br />
                <div className="loading-text">
                  Loading
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </div>
              </div>
            ) : (
              <>
                <div className="doctor-profile-header">
                  <UserHeader
                    imgSrc={selectedUser?.profilePhoto || "/images/user.png"} // Display correct profile photo
                    name={selectedUser?.fullName}
                    role={
                      selectedUser?.role == "Coordinator" ||
                      selectedUser?.role == "Audit Manager"
                        ? "Sub-Admin"
                        : null
                    }
                    style={{ backgroundColor: "white" }}
                  >
                    <div className="contact-detail">
                      <LabeledIconText
                        iconClass="fa-solid fa-envelope"
                        label="Email-ID"
                        value={selectedUser?.email}
                      />
                      <LabeledIconText
                        iconClass="fa-solid fa-phone"
                        label="Phone Number"
                        value={selectedUser?.phoneNumber}
                      />
                      {selectedUser?.officeAddress && (
                        <LabeledIconText
                          iconClass="fa-solid fa-location-dot"
                          label="Office Address"
                          value={selectedUser?.officeAddress}
                        />
                      )}
                    </div>
                  </UserHeader>

                  {isFromManagement && (
                    <div className="doctor-profile-btn">
                      <DropdownSelect
                        user={selectedUser}
                        onOpen={handleOpen}
                        defaultValue={selectedUser?.state}
                        options={["Active", "Deactive"]}
                        includeLabel={true} // shows "Select State" label
                        index={0} // Unique index for tracking
                        activeDropdownIndex={activeDropdownIndex}
                        setActiveDropdownIndex={setActiveDropdownIndex}
                      />
                      <button className="delete-btn" onClick={handleDelete}>
                        <div>
                          <img src="/images/icons trash.png" alt="trash" />
                        </div>
                        <span>Delete Profile</span>
                      </button>
                    </div>
                  )}
                </div>

                {shouldShowRoleBox && (
                  <div className="sub-admin-role-box">
                    <div className="sub-admin-role">
                      <i class="fa-solid fa-briefcase"></i>
                      <strong>Role</strong>
                      <p>{selectedUser?.role}</p>
                    </div>
                    {isFromManagement && (
                      <div className="sub-admin-role-edit-btn">
                        <button onClick={handleOpen}>Edit</button>
                      </div>
                    )}
                  </div>
                )}

                {!isFromPatient && (isDoctor || isPatient) && (
                  <UserAppointmentTable padding={"0px"} userId={userId} />
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default UserProfile;
