import { useState } from "react";
import { SignupFormDemo } from "../components/ui/SignupForm";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    image: "",
    password: "",
  });

  return (
    <div className="w-full min-h-screen flex flex-col  justify-center items-center  bg-black">
      <Link
        className="absolute top-5 px-3 overflow-x-hidden w-full  text-white text-[30px] font-bold font-sans"
        to="/"
      >
        <p className="">Glide</p>
      </Link>

      <span className="border-white bg-black mt-10">
        <SignupFormDemo formData={formData} setFormData={setFormData} />
      </span>
    </div>
  );
};

export default Signup;
