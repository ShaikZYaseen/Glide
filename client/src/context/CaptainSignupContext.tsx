import React, { createContext, useContext, useState, ReactNode } from "react";

interface CaptainSignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  color: string;
  plate: string | null;
  capacity: string | null;
  vehicleType: string;
  image?: any;
}

interface SignupContextType {
  signupData: CaptainSignupData;
  setSignupData: (data: Partial<CaptainSignupData>) => void;
  clearSignupData: () => void;
}

const CaptainSignupContext = createContext<SignupContextType | undefined>(
  undefined
);

export const CaptainSignupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [signupData, setSignupDataState] = useState<CaptainSignupData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    color: "",
    plate: "",
    vehicleType: "",
    capacity: "",
    image: "",
  });

  const setSignupData = (data: Partial<CaptainSignupData>) => {
    setSignupDataState((prev) => ({ ...prev, ...data }));
  };

  const clearSignupData = () => {
    setSignupDataState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      color: "",
      vehicleType: "",
      plate: "",
      capacity: "",
      password: "",
      image: "",
    });
  };

  return (
    <CaptainSignupContext.Provider
      value={{ signupData, setSignupData, clearSignupData }}
    >
      {children}
    </CaptainSignupContext.Provider>
  );
};

export const useCaptainSignup = (): SignupContextType => {
  const context = useContext(CaptainSignupContext);
  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }
  return context;
};
