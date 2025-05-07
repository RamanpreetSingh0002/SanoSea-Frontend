import React from "react";
import ApiProvider from "./ApiProvider";
import AuthProvider from "./AuthProvider";
import ModalProvider from "./ModalProvider";
import BookingProvider from "./BookingProvider";
import UserFormProvider from "./UserFormProvider";
import AppointmentProvider from "./AppointmentProvider";
import NotificationProvider from "./NotificationProvider";
import NeedPermissionProvider from "./NeedPermissionProvider";

const ContextProviders = ({ children }) => {
  return (
    <ApiProvider>
      <NotificationProvider>
        <NeedPermissionProvider>
          <AppointmentProvider>
            <BookingProvider>
              <UserFormProvider>
                <ModalProvider>
                  <AuthProvider>{children}</AuthProvider>
                </ModalProvider>
              </UserFormProvider>
            </BookingProvider>
          </AppointmentProvider>
        </NeedPermissionProvider>
      </NotificationProvider>
    </ApiProvider>
  );
};

export default ContextProviders;
