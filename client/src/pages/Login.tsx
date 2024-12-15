import { useState } from "react";
import { LoginForm } from "../components/ui/LoginForm";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="w-full h-screen flex justify-center items-center  bg-black">
      <span className="border-white w-1/3 bg-black">
        <LoginForm formData={formData} setFormData={setFormData} />
      </span>
    </div>
  );
};

export default Login;
