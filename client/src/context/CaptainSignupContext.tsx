import React, { createContext, useContext, useState, ReactNode } from "react";

interface CaptainSignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  image?: any;
}

interface SignupContextType {
  signupData: SignupData;
  setSignupData: (data: Partial<SignupData>) => void;
  clearSignupData: () => void;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [signupData, setSignupDataState] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    image: null,
  });

  const setSignupData = (data: Partial<SignupData>) => {
    setSignupDataState((prev) => ({ ...prev, ...data }));
  };

  const clearSignupData = () => {
    setSignupDataState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      image: null,
    });
  };

  return (
    <SignupContext.Provider
      value={{ signupData, setSignupData, clearSignupData }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = (): SignupContextType => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }
  return context;
};
