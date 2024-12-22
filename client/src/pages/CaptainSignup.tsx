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
  });

  return (
    <div className="w-full flex flex-col  justify-center items-center  bg-black">
      <CaptainSignupForm formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default CaptainSignup;
