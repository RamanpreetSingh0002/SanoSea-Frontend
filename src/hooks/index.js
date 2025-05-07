import { useContext } from "react";
import { ApiContext } from "../context/ApiProvider";
import { AuthContext } from "../context/AuthProvider";
import { ModalContext } from "../context/ModalProvider";
import { BookingContext } from "../context/BookingProvider";
import { UserFormContext } from "../context/UserFormProvider";
import { NotificationContext } from "../context/NotificationProvider";
import { NeedPermissionContext } from "../context/NeedPermissionProvider";
import { AppointmentContext } from "../context/AppointmentProvider";

export const useApi = () => useContext(ApiContext);
export const useAuth = () => useContext(AuthContext);
export const useModal = () => useContext(ModalContext);
export const useBooking = () => useContext(BookingContext);
export const useUserForm = () => useContext(UserFormContext);
export const useAppointments = () => useContext(AppointmentContext);
export const useNotification = () => useContext(NotificationContext);
export const useNeedPermission = () => useContext(NeedPermissionContext);
