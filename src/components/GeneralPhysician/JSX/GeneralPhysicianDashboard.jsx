import React from "react";
import DashWithStats from "../../DashWithStats";
import BookingTable from "../../Appointments/JSX/BookingTable";

import "../Style/GeneralPhysician.css";

const GeneralPhysicianDashboard = () => {
  return (
    <DashWithStats>
      <BookingTable height="58vh" isToday={true} />
    </DashWithStats>
  );
};

export default GeneralPhysicianDashboard;
