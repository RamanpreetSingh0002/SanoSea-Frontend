import React, { useEffect, useState } from "react";
import Bits from "../../Bits";
import { fetchDashboardStats } from "../../../api/appointment";
import { useApi } from "../../../hooks";

const CardGrid = () => {
  const { fetchingStats, handleFetchStats, stats } = useApi();

  useEffect(() => {
    handleFetchStats();
  }, []);

  const statsData = [
    {
      heading: "Registered Patients",
      count: stats.totalPatients,
      img: "/images/PatientCooPage.png",
    },
    {
      heading: "Upcoming Appointments",
      count: stats.totalUpcomingAppointments,
      icon: "fa-brands fa-microsoft",
    },
    {
      heading: "Port Agents Added",
      count: stats.totalPortAgents,
      img: "/images/Port_Agent.png",
    },
    {
      heading: "New Appointment",
      count: stats.totalNewAppointments,
      icon: "fa-solid fa-circle-check",
    },
    {
      heading: "Doctor Added",
      count: stats.totalDoctors,
      img: "/images/DoctorCooPage.png",
    },
    {
      heading: "Cancelled Appointments",
      count: stats.totalCancelledAppointments,
      icon: "fa-solid fa-circle-xmark",
    },
  ];

  return (
    <div className="card-grid">
      <div className="row">
        {statsData.map(({ heading, count, img, icon }) => (
          <Bits
            key={heading}
            col="6"
            heading={heading}
            busy={fetchingStats}
            count={count}
            image={img}
            iconClass={icon}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
