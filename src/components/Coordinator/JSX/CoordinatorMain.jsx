import React from "react";
import CardGrid from "./CardGrid";
import ListCard from "../../ListCard";
import AllBooking from "../../AllBooking";
import TBox from "../../TBox";
import Table from "../../Table";
import CoordinatorTbody from "./CoordinatorTbody";

const CoordinatorMain = ({ onAuditOpen, onPortOpen }) => {
  return (
    <main id="coordinator-main">
      {/* Coordinator Section */}
      <section id="coordinator-section">
        <div className="row">
          {/* Left Section - Registered Patients & Other Stats */}
          <div className="col-md-6 col-sm-12">
            <CardGrid />
          </div>

          {/* Right Section - Audit Manager & Port Agent */}
          <div className="col-md-3 col-sm-12">
            <ListCard
              title="Audit Manager"
              onOpen={onAuditOpen}
              data={[
                {
                  image: "/images/male-1.jpg",
                  name: "Justin ",
                  link: "#",
                },
                {
                  image: "/images/male-3.jpg",
                  name: "Jassie",
                  link: "#",
                },
                {
                  image: "/images/female-2.jpg",
                  name: "Shaify",
                  link: "#",
                },
                {
                  image: "/images/male-5.jpg",
                  name: "Franci",
                  link: "#",
                },
                {
                  image: "/images/female-4.jpg",
                  name: "Diana",
                  link: "#",
                },
              ]}
            />
          </div>

          <div className="col-md-3 col-sm-12">
            <ListCard
              title="Port Agent Added"
              onOpen={onPortOpen}
              data={[
                {
                  image: "/images/female-4.jpg",
                  name: "Alinaa",
                  link: "#",
                },
                {
                  image: "/images/male-2.jpg",
                  name: "Rohan",
                  link: "#",
                },
                {
                  image: "/images/male-5.jpg",
                  name: "Jasvir ",
                  link: "#",
                },
                {
                  image: "/images/female-5.jpg",
                  name: "visha",
                  link: "#",
                },
                {
                  image: "/images/female-4.jpg",
                  name: "Alia",
                  link: "#",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* patient detail table */}
      <AllBooking>
        <TBox heading="Today Bookings" />

        {/* table */}

        <Table>
          <CoordinatorTbody />
        </Table>
      </AllBooking>
    </main>
  );
};

export default CoordinatorMain;
