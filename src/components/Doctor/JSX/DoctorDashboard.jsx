import React, { useEffect } from "react";

import AppointmentCalendar from "./AppointmentCalender";
import NewAppointments from "./NewAppointments";
import Bits from "../../Bits";
import { useApi } from "../../../hooks";

const DoctorDashboard = () => {
  const { fetchingStats, handleFetchStats, stats } = useApi();

  useEffect(() => {
    handleFetchStats();
  }, []);

  const statsData = [
    {
      heading: "Upcoming Appointments",
      count: stats.totalUpcomingAppointments,
      icon: "fa-solid fa-user",
    },
    {
      heading: "Completed Appointments",
      count: stats.totalCompletedAppointments,
      icon: "fa-solid fa-circle-check",
    },
    {
      heading: "Cancelled Appointments",
      count: stats.totalCancelledAppointments,
      icon: "fa-solid fa-circle-xmark",
    },
  ];

  return (
    <main id="main">
      <section id="bits-container">
        <div className="row">
          <div className="col-8">
            <div className="bits-calender">
              <div class="doctor-bits-section">
                <div class="row">
                  {statsData.map(({ heading, count, img, icon }) => (
                    <Bits
                      key={heading}
                      col="4"
                      heading={heading}
                      busy={fetchingStats}
                      count={count}
                      image={img}
                      iconClass={icon}
                    />
                  ))}
                </div>
              </div>

              <AppointmentCalendar />
            </div>
          </div>

          <div className="col-4">
            <NewAppointments />
          </div>
        </div>
      </section>
    </main>
  );
};

export default DoctorDashboard;
