import { Route, Routes } from "react-router-dom";

import SignInSignUp from "./components/Auth/JSX/SignInSignUp.jsx";
import PatientDashboard from "./components/Patient/JSX/PatientDashboard.jsx";
import EmailVerification from "./components/Auth/JSX/EmailVerification.jsx";
import ForgotPassword from "./components/Auth/JSX/ForgotPassword.jsx";
import ResetPassword from "./components/Auth/JSX/ResetPassword.jsx";
import GeneralPhysician from "./components/GeneralPhysician/JSX/GeneralPhysician.jsx";
import BookAppointment from "./components/GeneralPhysician/JSX/BookAppointment.jsx";
import CoordinatorDashboard from "./components/Coordinator/JSX/CoordinatorDashboard.jsx";
import AuditManagerModal from "./components/AuditManager/JSX/AuditManagerModal.jsx";
import PortAgentModal from "./components/PortAgent/JSX/PortAgentModal.jsx";
import AdminBookingDetail from "./components/Admin/JSX/AdminBookingDetail.jsx";
import SubAdmin from "./components/Admin/JSX/SubAdmin.jsx";
import Doctor from "./components/Doctor/JSX/Doctor.jsx";
import ChangePassword from "./components/Auth/JSX/ChangePassword.jsx";
import Patients from "./components/Patient/JSX/Patients.jsx";
import Unconfirmed from "./components/Appointments/JSX/Unconfirmed.jsx";
import Upcoming from "./components/Appointments/JSX/Upcoming.jsx";
import DoctorProfile from "./components/Doctor/JSX/DoctorProfile.jsx";
import SubAdminProfile from "./components/Admin/JSX/SubAdminProfile.jsx";
import Cancelled from "./components/Appointments/JSX/Cancelled.jsx";
import Complete from "./components/Appointments/JSX/Complete.jsx";
import PortAgentDashboard from "./components/PortAgent/JSX/PortAgentDashboard.jsx";
import New from "./components/Appointments/JSX/New.jsx";
import PublicLayout from "./layout/PublicLayout.jsx";
import PrivateLayout from "./layout/PrivateLayout.jsx";
import ProfileSetting from "./components/Admin/JSX/ProfileSetting.jsx";

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
        <Route path="/" element={<SignInSignUp />} />
        <Route path="/auth/sign-in" element={<SignInSignUp />} />
        <Route path="/auth/sign-up" element={<SignInSignUp />} />

        <Route path="/auth/verify-email" element={<EmailVerification />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/change-password" element={<ChangePassword />} />

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
        {/* <Route path="/auth/book-appointment" element={<BookAppointment />} /> */}
        <Route
          path="/auth/coordinator-dashboard"
          element={privateRoutesWrapper(<CoordinatorDashboard />)}
        />
        {/* <Route path="/auth/audit-list" element={<AuditManagerModal />} />
        <Route path="/auth/port-list" element={<PortAgentModal />} /> */}
        <Route
          path="/auth/booking-detail"
          element={privateRoutesWrapper(<AdminBookingDetail />)}
        />
        <Route
          path="/auth/sub-admin"
          element={privateRoutesWrapper(<SubAdmin />)}
        />
        <Route path="/auth/doctor" element={privateRoutesWrapper(<Doctor />)} />

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

        <Route
          path="/auth/patient-detail"
          element={privateRoutesWrapper(<Patients />)}
        />

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
        <Route
          path="/auth/port-agent-dashboard"
          element={publicRoutesWrapper(<PortAgentDashboard />)}
        />
      </Routes>
    </>
  );
}

export default App;
