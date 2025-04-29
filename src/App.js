import { Route, Routes } from "react-router-dom";

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
import GeneralPhysician from "./components/GeneralPhysician/JSX/GeneralPhysician.jsx";
import CoordinatorDashboard from "./components/Coordinator/JSX/CoordinatorDashboard.jsx";
import PortAgentDashboard from "./components/PortAgent/JSX/PortAgentDashboard.jsx";

// * Admin/SubAdmin Side Nav
import SubAdminTable from "./components/Admin/JSX/SubAdminTable.jsx";
import DoctorTable from "./components/Doctor/JSX/DoctorTable.jsx";
import PatientTable from "./components/Patient/JSX/PatientTable.jsx";
import GeneralPhysicianTable from "./components/GeneralPhysician/JSX/GeneralPhysicianTable.jsx";

// * Admin/SubAdmin Internal Paging
import AdminBookingDetail from "./components/Admin/JSX/AdminBookingDetail.jsx";
import DoctorProfile from "./components/Doctor/JSX/DoctorProfile.jsx";
import SubAdminProfile from "./components/Admin/JSX/SubAdminProfile.jsx";
import ProfileSetting from "./components/Admin/JSX/ProfileSetting.jsx";

// * Appointments
import Unconfirmed from "./components/Appointments/JSX/Unconfirmed.jsx";
import Upcoming from "./components/Appointments/JSX/Upcoming.jsx";
import Cancelled from "./components/Appointments/JSX/Cancelled.jsx";
import Complete from "./components/Appointments/JSX/Complete.jsx";
import New from "./components/Appointments/JSX/New.jsx";
import PortAgentTable from "./components/PortAgent/JSX/PortAgentTable.jsx";
import AppointmentTable from "./components/Appointments/JSX/AppointmentTable.jsx";

function App() {
  const publicRoutesWrapper = (Component) => {
    return <PublicLayout>{Component}</PublicLayout>;
  };

  const privateRoutesWrapper = (Component) => {
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
          path="/auth/admin-dashboard"
          element={privateRoutesWrapper(<CoordinatorDashboard />)}
        />
        <Route
          path="/auth/sub-admin-dashboard"
          element={privateRoutesWrapper(<CoordinatorDashboard />)}
        />
        <Route
          path="/auth/patient-dashboard"
          element={publicRoutesWrapper(<PatientDashboard />)}
        />
        <Route
          path="/auth/general-physician-dashboard"
          element={<GeneralPhysician />}
        />
        <Route
          path="/auth/coordinator-dashboard"
          element={privateRoutesWrapper(<CoordinatorDashboard />)}
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
          path="/auth/booking-detail"
          element={privateRoutesWrapper(<AdminBookingDetail />)}
        />
        <Route
          path="/auth/doctor-profile"
          element={privateRoutesWrapper(<DoctorProfile />)}
        />
        <Route
          path="/auth/admin-profile-setting"
          element={privateRoutesWrapper(<ProfileSetting />)}
        />
        <Route
          path="/auth/sub-admin-profile"
          element={privateRoutesWrapper(<SubAdminProfile />)}
        />

        {/* Appointments */}
        <Route
          path="/auth/unconfirmed-appointment"
          element={publicRoutesWrapper(<Unconfirmed />)}
        />
        <Route
          path="/auth/upcoming-appointment"
          element={publicRoutesWrapper(<Upcoming />)}
        />
        <Route
          path="/auth/cancelled-appointment"
          element={publicRoutesWrapper(<Cancelled />)}
        />
        <Route
          path="/auth/complete-appointment"
          element={publicRoutesWrapper(<Complete />)}
        />
        <Route
          path="/auth/new-appointment"
          element={publicRoutesWrapper(<New />)}
        />
      </Routes>
    </>
  );
}

export default App;
