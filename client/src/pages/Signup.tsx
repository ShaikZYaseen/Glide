import { useState } from "react";
import { SignupFormDemo } from "../components/ui/SignupForm";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    image: "",
    password: "",
  });

  return (
    <div className="w-full flex justify-center items-center  bg-black">
      <span className="border-white bg-black">
        <SignupFormDemo formData={formData} setFormData={setFormData} />
      </span>
    </div>
  );
};

export default Signup;
