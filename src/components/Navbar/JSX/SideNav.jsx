import React, { useEffect } from "react";

import SideNavIcon from "./SideNavIcon";
import { useAppointments, useAuth, useBooking } from "../../../hooks";

import "../Style/SideNav.css";
import { useLocation, useNavigate } from "react-router-dom";

const SideNav = () => {
  const { authInfo, handleLogout } = useAuth();
  const { profile } = authInfo;

  const { handleOpenBooking } = useBooking();

  const {
    fetchAppointments,
    fetchTodayAppointments,
    fetchAppointmentsForUser,
  } = useAppointments();

  const navigate = useNavigate();
  const location = useLocation();

  const loginUser = profile?.role;
  const isPatient = profile?.role === "Patient";
  const isDoctor = profile?.role === "Doctor";

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

  const dashboardPage =
    roleLandingPages[normalizedRole] || "/auth/default-dashboard";

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

  // useEffect(() => {
  //   const navItems = document.querySelectorAll(".has-subnav");

  //   navItems.forEach((item, index) => {
  //     const img = item.querySelector("img");

  //     if (img) {
  //       const originalSrc = img.src;
  //       let newSrc;

  //       // Set the new image source based on the index or any other condition
  //       switch (index) {
  //         case 0:
  //           newSrc = "/images/grid-white.png";
  //           break;
  //         case 1:
  //         case 2:
  //         case 3:
  //         case 4:
  //         case 5:
  //         case 6:
  //           newSrc = "/images/Calender-white.png"; // You can add more cases for different images
  //           break;
  //         default:
  //           newSrc = originalSrc; // Fallback in case there's no new image defined
  //       }

  //       item.addEventListener("mouseover", () => {
  //         img.src = newSrc;
  //       });

  //       item.addEventListener("mouseout", () => {
  //         img.src = originalSrc;
  //       });
  //     }
  //   });
  // }, []);

  return (
    <nav class="main-menu">
      <ul>
        <SideNavIcon
          to={dashboardPage}
          imgSrc="/images/grid.png"
          sideNavLabel={"Dashboard"}
          onClick={() =>
            isPatient
              ? fetchAppointmentsForUser(profile?.id, 0, 5, "", "")
              : fetchTodayAppointments(0, 5)
          }
        />

        {!isPatient && (
          <SideNavIcon
            to="/auth/all-appointment"
            imgSrc="/images/Calender.png"
            iconClass={"fa-solid fa-list"}
            sideNavLabel={"All Bookings"}
            onClick={() =>
              isDoctor
                ? fetchAppointmentsForUser(
                    "6818b6d439730375eb51ae11",
                    0,
                    7,
                    "",
                    ""
                  )
                : fetchAppointments(0, 7, "", "")
            }
          />
        )}

        <SideNavIcon
          to="/auth/complete-appointment"
          imgSrc="/images/Calender.png"
          iconClass={"fa-solid fa-check"}
          sideNavLabel={"Complete"}
          onClick={() =>
            isPatient || isDoctor
              ? fetchAppointmentsForUser(profile?.id, 0, 7, "Complete", "")
              : fetchAppointments(0, 7, "Complete", "")
          }
        />

        <SideNavIcon
          to="/auth/upcoming-appointment"
          imgSrc="/images/Calender.png"
          iconClass={"fa-regular fa-user"}
          sideNavLabel={"Upcoming"}
          onClick={() =>
            isPatient || isDoctor
              ? fetchAppointmentsForUser(profile?.id, 0, 7, "Upcoming", "")
              : fetchAppointments(0, 7, "Upcoming", "")
          }
        />

        <SideNavIcon
          to="/auth/unconfirmed-appointment"
          imgSrc="/images/Calender.png"
          iconClass={"fa-solid fa-exclamation"}
          sideNavLabel={"Un-Confirmed"}
          onClick={() =>
            isPatient || isDoctor
              ? fetchAppointmentsForUser(profile?.id, 0, 7, "Waiting", "")
              : fetchAppointments(0, 7, "Waiting", "")
          }
        />

        <SideNavIcon
          to="/auth/cancelled-appointment"
          imgSrc="/images/Calender.png"
          iconClass={"fa-solid fa-xmark"}
          sideNavLabel={"Cancelled"}
          onClick={() =>
            isPatient || isDoctor
              ? fetchAppointmentsForUser(profile?.id, 0, 7, "Cancelled", "")
              : fetchAppointments(0, 7, "Cancelled", "")
          }
        />

        <SideNavIcon
          to="/auth/new-appointment"
          imgSrc="/images/Calender.png"
          iconClass={"fa-solid fa-plus"}
          sideNavLabel={"New"}
          onClick={() =>
            isPatient || isDoctor
              ? fetchAppointmentsForUser(profile?.id, 0, 7, "New", "")
              : fetchAppointments(0, 7, "New", "")
          }
        />

        <SideNavIcon
          to="/auth/past-appointment"
          imgSrc="/images/Calender.png"
          iconClass={"fa-solid fa-clock-rotate-left"}
          sideNavLabel={"Past"}
          onClick={() =>
            isPatient || isDoctor
              ? fetchAppointmentsForUser(profile?.id, 0, 7, "Past", "")
              : fetchAppointments(0, 7, "Past", "")
          }
        />

        {loginUser === "General Physician" && (
          <SideNavIcon
            to="#"
            imgSrc="/images/Calender.png"
            iconClass={"fa-solid fa-check-double"}
            sideNavLabel={"Book Now"}
            onClick={handleOpenBooking}
          />
        )}
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

export default SideNav;
