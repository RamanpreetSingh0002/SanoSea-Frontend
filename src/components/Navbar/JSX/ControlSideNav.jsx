import React, { useEffect } from "react";

import SideNavIcon from "./SideNavIcon";
import { useAuth } from "../../../hooks";

import "../Style/SideNav.css";
import { useNavigate } from "react-router-dom";

const ControlSideNav = ({ bookNow, onOpen }) => {
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  useEffect(() => {
    const navItems = document.querySelectorAll(".has-subnav");

    navItems.forEach((item, index) => {
      const img = item.querySelector("img");

      if (img) {
        const originalSrc = img.src;
        let newSrc;

        // Set the new image source based on the index or any other condition
        switch (index) {
          case 0:
            newSrc = "/images/grid-white.png";
            break;
          case 1:
            newSrc = "/images/setting-white.png";
            break;
          case 2:
            newSrc = "/images/management-white.png";
            break;
          case 3:
            newSrc = "/images/subAdmin-white.png";
            break;
          case 4:
            newSrc = "/images/doctor-white.png";
            break;
          case 5:
            newSrc = "/images/patient-white.png";
            break;
          case 6:
            newSrc = "/images/general-phy-white.png";
            break;
          case 7:
            newSrc = "/images/navShip-white.png";
            break;
          case 8:
            newSrc = "/images/portAgent-white.png";
            break;
          case 9:
            newSrc = "/images/appointment-white.png";
            break;
          default:
            newSrc = originalSrc; // Fallback in case there's no new image defined
        }

        item.addEventListener("mouseover", () => {
          img.src = newSrc;
        });

        item.addEventListener("mouseout", () => {
          img.src = originalSrc;
        });
      }
    });
  }, []);

  return (
    <nav class="main-menu">
      <ul>
        <SideNavIcon
          imgSrc="/images/grid.png"
          onClick={() => navigate("/auth/admin-dashboard")}
          sideNavLabel={"Dashboard"}
        />

        <SideNavIcon
          imgSrc="/images/setting.png"
          onClick={() => navigate("/auth/admin-profile-setting")}
          sideNavLabel={"Setting"}
        />

        <SideNavIcon
          imgSrc="/images/management.png"
          sideNavLabel={"Management"}
        />

        <SideNavIcon
          imgSrc="/images/subAdmin.png"
          onClick={() => navigate("/auth/sub-admin")}
          sideNavLabel={"Sub-Admin"}
        />

        <SideNavIcon
          imgSrc="/images/doctor.png"
          onClick={() => navigate("/auth/doctor")}
          sideNavLabel={"Doctor"}
        />

        <SideNavIcon
          imgSrc="/images/patient.png"
          onClick={() => navigate("/auth/patient-detail")}
          sideNavLabel={"Patient"}
        />

        <SideNavIcon
          imgSrc="/images/general-phy.png"
          sideNavLabel={"General Physician"}
        />

        <SideNavIcon imgSrc="/images/navShip.png" sideNavLabel={"Ship"} />

        <SideNavIcon
          imgSrc="/images/portAgent.png"
          sideNavLabel={"Port Agent"}
        />

        <SideNavIcon
          imgSrc="/images/appointment.png"
          sideNavLabel={"Appointments"}
        />
      </ul>

      <ul class="logout">
        <li>
          <a onClick={handleLogout}>
            <div class="logout-icon">
              <i class="fa fa-power-off fa-2x"></i>
            </div>
            {/* <!-- <span class="nav-text"> Logout </span> --> */}
          </a>
        </li>
      </ul>

      <div class="menu-waves">
        <img src="/images/Wavy Layers.png" alt="" />
      </div>
    </nav>
  );
};

export default ControlSideNav;
