import React from "react";
import UserTRow from "./UserTRow";
import TBox from "./TBox";

// import AddUser from "./AddUser";

const UserTablePage = ({ header, addBtn }) => {
  return (
    <main>
      <section id="sub-admin-section">
        <div className="sub-admin-header">
          <h4>{header}</h4>
          <div className="doctor-btn">
            <button className="doctor-search-btn">
              <i className="fa-solid fa-search"></i>
            </button>
            {/* {profile?.role == "Admin" && ( */}
            {/* <button className="add-user-btn" onClick={handleOpenBox}> */}
            <button className="add-user-btn">
              <img src="/images/icon-plus-white.png" alt="icon-plus" />
              {addBtn}
            </button>
            {/* )} */}
          </div>
        </div>

        <div className="sub-admin-box">
          <TBox heading={header} />
          <table className="sub-admin-table">
            <thead>
              <tr>
                <th>{header + "s"}</th>
                <th>Email</th>
                <th>State</th>
                <th colSpan="2"></th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Jaydon Bartor",
                  email: "jaydonbartor@gmail.com",
                  imgSrc: "/images/male-1.jpg",
                },
                {
                  name: "Shaify",
                  email: "Shaify@gmail.com",
                  imgSrc: "/images/female-2.jpg ",
                },
                {
                  name: "Vikram",
                  email: "Vikram@gmail.com",
                  imgSrc: "/images/male-3.jpg",
                },
                {
                  name: "Aryan",
                  email: "Aryan@gmail.com",
                  imgSrc: "/images/male-5.jpg",
                },
                {
                  name: "Vishal",
                  email: "Vishal@gmail.com",
                  imgSrc: "/images/male-2.jpg",
                },
                {
                  name: "Shilpa",
                  email: "Shilpa@gmail.com",
                  imgSrc: "/images/female-4.jpg",
                },
              ].map((user, index) => (
                <UserTRow
                  key={index}
                  name={user.name}
                  email={user.email}
                  imgSrc={user.imgSrc}
                  index={index}
                  //   activeDropdownIndex={activeDropdownIndex}
                  //   setActiveDropdownIndex={setActiveDropdownIndex}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* {isBoxOpen && (
        <div className="box-overlay">
          <AddUser isClosing={isClosing} onClose={handleCloseBox} />
        </div>
      )} */}
    </main>
  );
};

export default UserTablePage;
