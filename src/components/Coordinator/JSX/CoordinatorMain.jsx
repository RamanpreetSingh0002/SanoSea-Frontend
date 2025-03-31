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
                  image: "/images/person.jpg",
                  name: "Justin Franci",
                  link: "#",
                },
                {
                  image: "/images/person.jpg",
                  name: "Justin Franci",
                  link: "#",
                },
                {
                  image: "/images/person.jpg",
                  name: "Justin Franci",
                  link: "#",
                },
                {
                  image: "/images/person.jpg",
                  name: "Justin Franci",
                  link: "#",
                },
                {
                  image: "/images/person.jpg",
                  name: "Justin Franci",
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
                  image: "/images/person.jpg",
                  name: "Justin Franci",
                  link: "#",
                },
                {
                  image: "/images/person.jpg",
                  name: "Justin Franci",
                  link: "#",
                },
                {
                  image: "/images/person.jpg",
                  name: "Justin Franci",
                  link: "#",
                },
                {
                  image: "/images/person.jpg",
                  name: "Justin Franci",
                  link: "#",
                },
                {
                  image: "/images/person.jpg",
                  name: "Justin Franci",
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
