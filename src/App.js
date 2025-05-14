import { Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/index.js";

// * Layouts
import PublicLayout from "./layout/PublicLayout.jsx";
import PrivateLayout from "./layout/PrivateLayout.jsx";

// * Auth
import SignInSignUp from "./components/Auth/JSX/SignInSignUp.jsx";
import EmailVerification from "./components/Auth/JSX/EmailVerification.jsx";
import ForgotPassword from "./components/Auth/JSX/ForgotPassword.jsx";
import ResetPassword from "./components/Auth/JSX/ResetPassword.jsx";
import ChangePassword from "./components/Auth/JSX/ChangePassword.jsx";

// * Dashboards
import PatientDashboard from "./components/Patient/JSX/PatientDashboard.jsx";
import PortAgentDashboard from "./components/PortAgent/JSX/PortAgentDashboard.jsx";

// * Admin/SubAdmin Side Nav
import SubAdminTable from "./components/Admin/JSX/SubAdminTable.jsx";
import DoctorTable from "./components/Doctor/JSX/DoctorTable.jsx";
import PatientTable from "./components/Patient/JSX/PatientTable.jsx";
import GeneralPhysicianTable from "./components/GeneralPhysician/JSX/GeneralPhysicianTable.jsx";

// * Admin/SubAdmin Internal Paging
import BookingDetail from "./components/Admin/JSX/BookingDetail.jsx";
import DoctorProfile from "./components/Doctor/JSX/DoctorProfile.jsx";
import EditProfile from "./components/User/JSX/EditProfile.jsx";

// * Appointments
import Unconfirmed from "./components/Appointments/JSX/Unconfirmed.jsx";
import Upcoming from "./components/Appointments/JSX/Upcoming.jsx";
import Cancelled from "./components/Appointments/JSX/Cancelled.jsx";
import Complete from "./components/Appointments/JSX/Complete.jsx";
import New from "./components/Appointments/JSX/New.jsx";
import PortAgentTable from "./components/PortAgent/JSX/PortAgentTable.jsx";
import AppointmentTable from "./components/Appointments/JSX/AppointmentTable.jsx";

// * User
import UserProfile from "./components/User/JSX/UserProfile.jsx";
import ManagementDashboard from "./components/Admin/JSX/ManagementDashboard.jsx";
import Past from "./components/Appointments/JSX/Past.jsx";
import AllBookings from "./components/Appointments/JSX/AllBookings.jsx";
import GeneralPhysicianDashboard from "./components/GeneralPhysician/JSX/GeneralPhysicianDashboard.jsx";
import DoctorDashboard from "./components/Doctor/JSX/DoctorDashboard.jsx";

function App() {
  const { authInfo } = useAuth();
  const { profile } = authInfo;
  const isPrivate =
    profile?.role === "Admin" ||
    profile?.role === "Coordinator" ||
    profile?.role === "Audit Manager";

  const publicRoutesWrapper = Component => {
    return <PublicLayout>{Component}</PublicLayout>;
  };

  const privateRoutesWrapper = Component => {
    return <PrivateLayout>{Component}</PrivateLayout>;
  };

  return (
    <>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<SignInSignUp />} />
        <Route path="/auth/sign-in" element={<SignInSignUp />} />
        <Route path="/auth/sign-up" element={<SignInSignUp />} />

        <Route path="/auth/verify-email" element={<EmailVerification />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/change-password" element={<ChangePassword />} />

        {/* Dashboards */}
        <Route
          path="/auth/management-dashboard"
          element={privateRoutesWrapper(<ManagementDashboard />)}
        />
        <Route
          path="/auth/general-physician-dashboard"
          element={publicRoutesWrapper(<GeneralPhysicianDashboard />)}
        />
        <Route
          path="/auth/patient-dashboard"
          element={publicRoutesWrapper(<PatientDashboard />)}
        />
        <Route
          path="/auth/doctor-dashboard"
          element={publicRoutesWrapper(<DoctorDashboard />)}
        />

        <Route
          path="/auth/port-agent-dashboard"
          element={publicRoutesWrapper(<PortAgentDashboard />)}
        />

        {/* Admin-SubAdmin side nav routes */}
        <Route
          path="/auth/sub-admin"
          element={privateRoutesWrapper(<SubAdminTable />)}
        />
        <Route
          path="/auth/doctor"
          element={privateRoutesWrapper(<DoctorTable />)}
        />
        <Route
          path="/auth/patient"
          element={privateRoutesWrapper(<PatientTable />)}
        />
        <Route
          path="/auth/general-physician"
          element={privateRoutesWrapper(<GeneralPhysicianTable />)}
        />
        <Route
          path="/auth/port-agent"
          element={privateRoutesWrapper(<PortAgentTable />)}
        />
        <Route
          path="/auth/appointments"
          element={privateRoutesWrapper(<AppointmentTable />)}
        />

        {/* Admin/SubAdmin Internal Paging */}
        <Route
          path="/auth/booking-detail/:appointmentId"
          element={privateRoutesWrapper(<BookingDetail />)}
        />
        <Route
          path="/auth/doctor-profile"
          element={privateRoutesWrapper(<DoctorProfile />)}
        />
        <Route
          path="/auth/edit-profile"
          element={privateRoutesWrapper(<EditProfile />)}
        />

        {/* User */}
        <Route
          path="/auth/user-profile/:userId"
          element={
            isPrivate
              ? privateRoutesWrapper(<UserProfile />)
              : publicRoutesWrapper(<UserProfile />)
          }
        />

        {/* Appointments */}
        <Route
          path="/auth/all-appointment"
          element={publicRoutesWrapper(<AllBookings />)}
        />
        <Route
          path="/auth/complete-appointment"
          element={publicRoutesWrapper(<Complete />)}
        />
        <Route
          path="/auth/upcoming-appointment"
          element={publicRoutesWrapper(<Upcoming />)}
        />
        <Route
          path="/auth/unconfirmed-appointment"
          element={publicRoutesWrapper(<Unconfirmed />)}
        />

        <Route
          path="/auth/cancelled-appointment"
          element={publicRoutesWrapper(<Cancelled />)}
        />

        <Route
          path="/auth/new-appointment"
          element={publicRoutesWrapper(<New />)}
        />

        <Route
          path="/auth/past-appointment"
          element={publicRoutesWrapper(<Past />)}
        />
      </Routes>
    </>
  );
}

export default App;
