import { useState } from "react";
import { CaptainLoginForm } from "../components/ui/CaptainLoginForm";

const CaptainLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <CaptainLoginForm formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default CaptainLogin;
