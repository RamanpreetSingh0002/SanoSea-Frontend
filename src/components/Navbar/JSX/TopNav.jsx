import React, { useContext, useEffect } from "react";

import "../Style/TopNav.css";

import CustomLink from "../../CustomLink";
import { AuthContext } from "../../../context/AuthProvider";

const TopNav = () => {
  const { authInfo, isAuth } = useContext(AuthContext);
  const { profile, isPending } = authInfo;

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <header>
      <div class="logo">
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

          <span>
            <CustomLink href="/">
              <i class="fa-solid fa-bell"></i>
            </CustomLink>
          </span>

          <div class="profile">
            <div class="profile-image">
              <img
                src={profile?.profilePhoto || "/images/user.png"}
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
