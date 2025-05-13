import React from "react";

import BookingTable from "../../Appointments/JSX/BookingTable";
import DashWithStats from "../../DashWithStats";

const PortAgentDashboard = () => {
  return (
    <DashWithStats>
      <BookingTable height="58vh" showAddCab={true} isToday={true} />
    </DashWithStats>
  );
};

export default PortAgentDashboard;
