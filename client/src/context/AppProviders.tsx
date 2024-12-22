import React, { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { SignupProvider } from "./SignupContext";
import { CaptainSignupProvider } from "./CaptainSignupContext";

export const AppProviders: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <SignupProvider>
        <CaptainSignupProvider>{children}</CaptainSignupProvider>
      </SignupProvider>
    </AuthProvider>
  );
};
