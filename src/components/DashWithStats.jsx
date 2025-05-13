import React, { useEffect } from "react";
import { useApi, useAppointments } from "../hooks";
import Bits from "./Bits";
import AllBooking from "./AllBooking";
import TBox from "./TBox";

const DashWithStats = ({ children }) => {
  const { fetchingStats, handleFetchStats, stats } = useApi();
  const { fetchTodayAppointments, fetchParams } = useAppointments();

  useEffect(() => {
    handleFetchStats();
    fetchTodayAppointments(fetchParams.pageNo, 5);
  }, []);

  const statsData = [
    {
      heading: "Upcoming Appointments",
      count: stats.totalUpcomingAppointments,
      icon: "fa-solid fa-user",
    },

    {
      heading: "New Appointment Booked Today",
      count: stats.totalAppointmentsBookedToday,
      icon: "fa-brands fa-microsoft",
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
      <section id="appointment-section">
        <div class="row">
          {statsData.map(({ heading, count, img, icon }) => (
            <Bits
              key={heading}
              col="3"
              heading={heading}
              busy={fetchingStats}
              count={count}
              image={img}
              iconClass={icon}
            />
          ))}
        </div>
      </section>

      {/* patient detail table */}
      <AllBooking>
        <TBox
          heading="Today Bookings"
          onRefresh={() => fetchTodayAppointments(0, 5)}
        />

        {children}
      </AllBooking>
    </main>
  );
};

export default DashWithStats;
