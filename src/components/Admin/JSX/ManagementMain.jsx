import React, { useEffect, useState } from "react";

import { getUserByRole } from "../../../api/admin";

import CardGrid from "./CardGrid";
import ListCard from "../../ListCard";
import AllBooking from "../../AllBooking";
import TBox from "../../TBox";
import Table from "../../Table";
import ManagementTbody from "./ManagementTbody";

const ManagementMain = ({ onAuditOpen, onPortOpen }) => {
  const [auditManagers, setAuditManagers] = useState([]);
  const [portAgents, setPortAgents] = useState([]);
  const [auditListLoading, setAuditListLoading] = useState(false);
  const [portListLoading, setPortListLoading] = useState(false);

  useEffect(() => {
    const fetchAuditManager = async () => {
      setAuditListLoading(true);
      const response = await getUserByRole("Audit Manager", 0, 5); // Fetch data from API
      setAuditListLoading(false);

      if (!response.error) setAuditManagers(response.users); // Use API data
    };

    const fetchPortAgent = async () => {
      setPortListLoading(true);
      const response = await getUserByRole("Port Agent", 0, 5); // Fetch data from API
      setPortListLoading(false);

      if (!response.error) setPortAgents(response.users); // Use API data
    };

    fetchAuditManager(); // Fetch Audit Manager data
    fetchPortAgent(); // Fetch Port Agent data
  }, []);

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
              busy={auditListLoading}
              users={auditManagers.map(user => ({
                id: user?._id,
                image: user?.profilePhoto || "/images/user.png",
                name: user?.fullName,
              }))}
            />
          </div>

          <div className="col-md-3 col-sm-12">
            <ListCard
              title="Port Agent"
              onOpen={onPortOpen}
              busy={portListLoading}
              users={portAgents.map(user => ({
                id: user?._id,
                image: user?.profilePhoto || "/images/user.png",
                name: user?.fullName,
              }))}
            />
          </div>
        </div>
      </section>

      {/* patient detail table */}
      <AllBooking>
        <TBox heading="Today Bookings" showDateTime={true} />

        {/* table */}
        <Table>
          <ManagementTbody />
        </Table>
      </AllBooking>
    </main>
  );
};

export default ManagementMain;
