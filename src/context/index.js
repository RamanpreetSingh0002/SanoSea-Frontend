import React from "react";

import ApiProvider from "./ApiProvider";
import AuthProvider from "./AuthProvider";
import ModalProvider from "./ModalProvider";
import AddCabProvider from "./AddCabProvider";
import BookingProvider from "./BookingProvider";
import UserFormProvider from "./UserFormProvider";
import AddDoctorProvider from "./AddDoctorProvider";
import AppointmentProvider from "./AppointmentProvider";
import NotificationProvider from "./NotificationProvider";
import NeedPermissionProvider from "./NeedPermissionProvider";

const ContextProviders = ({ children }) => {
  return (
    <ApiProvider>
      <NotificationProvider>
        <AppointmentProvider>
          <NeedPermissionProvider>
            <AddCabProvider>
              <AddDoctorProvider>
                <BookingProvider>
                  <UserFormProvider>
                    <ModalProvider>
                      <AuthProvider>{children}</AuthProvider>
                    </ModalProvider>
                  </UserFormProvider>
                </BookingProvider>
              </AddDoctorProvider>
            </AddCabProvider>
          </NeedPermissionProvider>
        </AppointmentProvider>
      </NotificationProvider>
    </ApiProvider>
  );
};

export default ContextProviders;
