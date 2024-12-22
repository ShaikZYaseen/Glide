import { useState } from "react";
import { LoginForm } from "../components/ui/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="w-full min-h-screen flex justify-center items-center  bg-black">
      <Link
        className="absolute top-5 px-3 overflow-x-hidden w-full  text-white text-[30px] font-bold font-sans"
        to="/"
      >
        <p className="">Glide</p>
      </Link>

      <span className="border-white w-1/3 bg-black mt-5">
        <LoginForm formData={formData} setFormData={setFormData} />
      </span>
    </div>
  );
};

export default Login;
