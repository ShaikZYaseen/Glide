import React, { useState } from "react";
import { CaptainSignupForm } from "../components/ui/CaptainSignupForm";

const CaptainSignup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    image: "",
    password: "",
    capacity: "",
    vehicleType: "",
    color: "",
    plate: "",
  });

  return (
    <div className="w-full min-h-screen flex flex-col  justify-center items-center  bg-black">
      <CaptainSignupForm formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default CaptainSignup;
