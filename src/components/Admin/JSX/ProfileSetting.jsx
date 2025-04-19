import React from "react";
import ProfilePicture from "../../ProfilePicture";
import ProfileForm from "../../Form/ProfileForm";
// import "../Style/ProfileSetting.css";
import ControlSideNav from "../../Navbar/JSX/ControlSideNav";
import TopNav from "../../Navbar/JSX/TopNav";

const ProfileSetting = () => (
  <>
    <TopNav />
    <ControlSideNav />
    <section className="profile-section">
      <ProfilePicture />
      <ProfileForm />
    </section>
  </>
);

export default ProfileSetting;
