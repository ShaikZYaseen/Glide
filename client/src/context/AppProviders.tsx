import React, { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { SignupProvider } from "./SignupContext";

export const AppProviders: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <SignupProvider>{children}</SignupProvider>
    </AuthProvider>
  );
};
