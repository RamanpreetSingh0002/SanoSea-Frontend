import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import SideNavIcon from "./SideNavIcon";
import { useApi, useAppointments, useAuth } from "../../../hooks";

import "../Style/SideNav.css";

const ControlSideNav = ({ bookNow, onOpen }) => {
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

  const { fetchUsers, fetchParams: apiFetchParams } = useApi();
  const {
    fetchTodayAppointments,
    fetchAppointments,
    fetchParams: appointmentFetchParams,
  } = useAppointments();

  const location = useLocation(); // Get active route

  const handleSideNavClick = () => {
    localStorage.setItem("currentPage", 0); // Reset to first page when navigating from sideNav
    localStorage.removeItem("activeState");
    localStorage.setItem("stateQuery", "");
    localStorage.removeItem("selectedDate");
    localStorage.setItem("searchQuery", "");
  };

  useEffect(() => {
    const navItems = document.querySelectorAll(".has-subnav");

    navItems.forEach(item => {
      const navLink = item.querySelector(".nav-icon-button");
      const img = item.querySelector(".nav-img");

      if (img) {
        const colorImg = "/images/grid.png";
        const whiteImg = "/images/grid-white.png"; // White image for dashboard

        // Reset all images first before applying active states
        img.style.filter = "none"; // Reset filter for non-active items

        // Apply filter for ALL items except Dashboard
        if (!item.classList.contains("dashboard")) {
          item.addEventListener("mouseover", () => {
            img.style.filter = "brightness(0) invert(1)"; // Apply white filter
          });

          item.addEventListener("mouseout", () => {
            if (!navLink.classList.contains("active"))
              img.style.filter = "none"; // Reset filter when mouse leaves
          });

          if (navLink.classList.contains("active")) {
            img.style.filter = "brightness(0) invert(1)"; // Ensure active stays white
          }
        } else {
          // Use actual white image for Dashboard
          item.addEventListener("mouseover", () => {
            img.src = whiteImg;
          });

          item.addEventListener("mouseout", () => {
            if (!navLink.classList.contains("active")) {
              img.src = colorImg; // Reset only if NOT active
            }
          });

          // Restore Dashboard original image if no longer active
          if (!navLink.classList.contains("active")) {
            img.src = colorImg; // Ensures Dashboard resets when switching away
          } else {
            img.src = whiteImg; // Keeps white image when active
          }
        }
      }
    });

    return () => {
      navItems.forEach(item => {
        item.removeEventListener("mouseover", () => {});
        item.removeEventListener("mouseout", () => {});
      });
    };
  }, [location.pathname]);

  const navItems = [
    {
      to: "/auth/management-dashboard",
      label: "Dashboard",
      img: "/images/grid.png",
      keyFunction: () => fetchTodayAppointments(0, 5),
    },
    {
      to: "/auth/sub-admin",
      label: "Sub-Admin",
      img: "/images/subAdmin.png",
      keyFunction: () =>
        fetchUsers("Coordinator,Audit Manager", 0, apiFetchParams.limit),
    },
    {
      to: "/auth/doctor",
      label: "Doctor",
      img: "/images/doctor.png",
      keyFunction: () => fetchUsers("Doctor", 0, apiFetchParams.limit),
    },
    {
      to: "/auth/patient",
      label: "Patient",
      img: "/images/patient.png",
      keyFunction: () => fetchUsers("Patient", 0, apiFetchParams.limit),
    },
    {
      to: "/auth/general-physician",
      label: "General Physician",
      img: "/images/general-phy.png",
      keyFunction: () =>
        fetchUsers("General Physician", 0, apiFetchParams.limit),
    },
    {
      to: "/auth/port-agent",
      label: "Port Agent",
      img: "/images/portAgent.png",
      keyFunction: () => fetchUsers("Port Agent", 0, apiFetchParams.limit),
    },
    {
      to: "/auth/appointments",
      label: "Appointments",
      img: "/images/appointment.png",
      keyFunction: () => fetchAppointments(0, apiFetchParams.limit, "", ""),
    },
  ];

  return (
    <nav class="main-menu">
      <ul>
        {navItems.map(({ to, label, img, keyFunction }) => (
          <SideNavIcon
            key={to}
            imgSrc={img} // Conditionally switch to white image
            to={to}
            onClick={() => {
              handleSideNavClick();
              keyFunction();
              // if (to === "/auth/management-dashboard")
              // fetchTodayAppointments(0, useAppointments?.fetchParams?.limit);
              // if (to === "/auth/sub-admin")
              //   fetchUsers("Coordinator,Audit Manager", 0, fetchParams.limit);
              // else {
              //   if (
              //     to !== "/auth/management-dashboard" &&
              //     to !== "/auth/appointments"
              //   )
              //     fetchUsers(label, 0, fetchParams.limit);
              // }
            }}
            sideNavLabel={label}
          />
        ))}

        {/* <SideNavIcon
          imgSrc="/images/setting.png"
          onClick={() => navigate("/auth/admin-profile-setting")}
          sideNavLabel={"Setting"}
        /> */}

        {/* <SideNavIcon
          imgSrc="/images/management.png"
          sideNavLabel={"Management"}
        /> */}

        {/* <SideNavIcon imgSrc="/images/navShip.png" sideNavLabel={"Ship"} /> */}
      </ul>

      <ul class="logout">
        <li>
          <a onClick={handleLogout}>
            <div class="logout-icon">
              <i class="fa fa-power-off fa-2x"></i>
            </div>
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
