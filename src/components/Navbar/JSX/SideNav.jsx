import React, { useEffect } from "react";

import SideNavIcon from "./SideNavIcon";
import { useAuth } from "../../../hooks";

import "../Style/SideNav.css";

const SideNav = ({ bookNow, onOpen }) => {
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

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
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            newSrc = "/images/Calender-white.png"; // You can add more cases for different images
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
        <SideNavIcon imgSrc="/images/grid.png" sideNavLabel={"Dashboard"} />

        <SideNavIcon
          imgSrc="/images/Calender.png"
          iconClass={"fa-solid fa-list"}
          sideNavLabel={"My Bookings"}
        />

        <SideNavIcon
          imgSrc="/images/Calender.png"
          iconClass={"fa-solid fa-check"}
          sideNavLabel={"Complete"}
        />

        <SideNavIcon
          imgSrc="/images/Calender.png"
          iconClass={"fa-regular fa-user"}
          sideNavLabel={"Upcoming"}
        />

        <SideNavIcon
          imgSrc="/images/Calender.png"
          iconClass={"fa-solid fa-exclamation"}
          sideNavLabel={"Un-Confirmed"}
        />

        <SideNavIcon
          imgSrc="/images/Calender.png"
          iconClass={"fa-solid fa-xmark"}
          sideNavLabel={"Cancelled"}
        />

        {bookNow && (
          <SideNavIcon
            imgSrc="/images/Calender.png"
            iconClass={"fa-solid fa-check-double"}
            sideNavLabel={"Book Now"}
            onClick={onOpen}
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
