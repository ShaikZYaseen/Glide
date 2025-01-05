import { FileUpload } from "../components/ui/Upload";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { captainSignup } from "../services/auth";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useCaptainSignup } from "../context/CaptainSignupContext";

const CaptainUpload = () => {
  const { signupData, setSignupData } = useCaptainSignup();
  const navigate = useNavigate();
  const [files, setFiles] = useState<File | null>(null);

  useEffect(() => {
    if (!signupData.email || !signupData.password) {
      navigate("/signup");
    }
  }, []);

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setFiles(files[0]); // Add the first file to formData
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("email", signupData.email);
      formData.append("password", signupData.password);
      formData.append("firstName", signupData.firstName);
      formData.append("lastName", signupData.lastName);
      formData.append("phone", signupData.phone);
      formData.append("color", signupData.color);
      formData.append("plate", signupData.plate || "");
      formData.append("vehicleType", signupData.vehicleType);
      formData.append("capacity", signupData.capacity || "");
      if (files) {
        formData.append("image", files);
      }
      //@ts-ignore
      const response = await captainSignup(formData);
      if (response.success) {
        setSignupData(response.user);
        toast.success(response.message); // Trigger success toast
        setTimeout(() => {
          navigate(`/captain-login`);
        }, 1000);
      }
    } catch (error) {
      toast.error("An error occurred. Please try after sometime."); // Trigger error toast
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <Toaster />
      <Link
        className="absolute top-5 px-3 overflow-x-hidden w-full  text-white text-[30px] font-bold font-sans"
        to="/"
      >
        <p className="absolute top-5 text-black left-5  text-[30px] font-bold font-sans">
          Glide
        </p>
      </Link>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full h-[100%]">
          <FileUpload onChange={handleFileChange} />
        </div>
        <div className="text-center  w-full items-center justify-center">
          <Button
            onClick={() => {
              handleSubmit();
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default CaptainUpload;
