import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthProvider";

import "../Style/TopNav.css";

const TopNav = () => {
  const { authInfo, isAuth } = useContext(AuthContext);
  const { profile, isPending } = authInfo;

  console.log(profile);
  console.log(profile?.role);

  const navigate = useNavigate();

  const handleDashboardClick = () => {
    const roleLandingPages = {
      Admin: "/auth/management-dashboard",
      Coordinator: "/auth/management-dashboard",
      AuditManager: "/auth/management-dashboard",
      GeneralPhysician: "/auth/general-physician-dashboard",
      Doctor: "/auth/doctor-dashboard",
      PortAgent: "/auth/port-agent-dashboard",
      Patient: "/auth/patient-dashboard",
    };

    // Normalize role format by removing spaces
    const normalizedRole = profile?.role.replace(/\s+/g, "");

    // Efficient way to determine landing page
    const landingPage =
      roleLandingPages[normalizedRole] || "/auth/default-dashboard";

    console.log(roleLandingPages[normalizedRole]);

    navigate(landingPage);
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <header>
      <div class="logo" onClick={handleDashboardClick}>
        <img src="/images/Ship.png" alt="Ship" class="ship" />
        <img src="/images/sanosealabel.png" alt="SanoSea" class="seamed" />
      </div>

      <div class="top-nav">
        <div class="welcome">
          <h5>Welcome Back</h5>
          <p>
            Welcome Back <span>@{profile?.fullName}</span>
          </p>
        </div>

        <div class="top-nav-right-portion">
          {/* <span>
            <CustomLink href="/">
              <i class="fa-solid fa-moon"></i>
            </CustomLink>
          </span> */}

          {/* <span>
            <CustomLink href="/">
              <i class="fa-solid fa-search"></i>
            </CustomLink>
          </span> */}

          {/* <span>
            <CustomLink href="/">
              <i class="fa-solid fa-bell"></i>
            </CustomLink>
          </span> */}

          <div class="profile" onClick={() => navigate("/auth/edit-profile")}>
            <div class="profile-image">
              <img
                src={profile?.profilePhoto?.url || "/images/user.png"}
                alt="profile"
              />
            </div>

            <div class="user-detail">
              <h6>{profile?.fullName}</h6>
              <p>{profile?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
