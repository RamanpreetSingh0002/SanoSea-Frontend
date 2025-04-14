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

function App() {
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

        <Route path="/auth/patient-dashboard" element={<PatientDashboard />} />
        <Route
          path="/auth/general-physician-dashboard"
          element={<GeneralPhysician />}
        />
        {/* <Route path="/auth/book-appointment" element={<BookAppointment />} /> */}
        <Route
          path="/auth/coordinator-dashboard"
          element={<CoordinatorDashboard />}
        />
        {/* <Route path="/auth/audit-list" element={<AuditManagerModal />} />
        <Route path="/auth/port-list" element={<PortAgentModal />} /> */}
        <Route path="/auth/booking-detail" element={<AdminBookingDetail />} />
        <Route path="/auth/sub-admin" element={<SubAdmin />} />
        <Route path="/auth/doctor" element={<Doctor />} />
      </Routes>
    </>
  );
}

export default App;
