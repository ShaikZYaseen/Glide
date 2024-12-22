import { FileUpload } from "../components/ui/Upload";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../context/SignupContext";
import Button from "../components/ui/Button";
import { captainSignup, Signup } from "../services/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CaptainUpload = () => {
  const { signupData, setSignupData } = useSignup();
  const navigate = useNavigate();
  const [files, setFiles] = useState<File | null>(null);

  useEffect(() => {
    if (!signupData.email || !signupData.password) {
      navigate("/signup");
    }
  }, []);

  const handleFileChange = (files: File[]) => {
    setSignupData(
      { image: files[0] } // Store the first file in the photo field
    );
    console.log("Hitting", signupData);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("email", signupData.email);
      formData.append("password", signupData.password);
      formData.append("firstName", signupData.firstName);
      formData.append("lastName", signupData.lastName);
      formData.append("phone", signupData.phone);
      if (files) {
        formData.append("image", files);
      }
      //@ts-ignore
      const response = await captainSignup(formData);
      if (response.success) {
        toast.success(response.message); // Trigger success toast
        navigate(`/captain-login`);
      }
    } catch (error) {
      toast.error("An error occurred. Please try after sometime."); // Trigger error toast
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <Link
        className="absolute top-5 px-3 overflow-x-hidden w-full  text-white text-[30px] font-bold font-sans"
        to="/"
      >
        <p className="absolute top-5 left-5 text-white text-[30px] font-bold font-sans">
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
