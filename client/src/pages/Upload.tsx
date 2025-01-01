import { FileUpload } from "../components/ui/Upload";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../context/SignupContext";
import Button from "../components/ui/Button";
import { Signup } from "../services/auth";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast"; // Corrected import

const Upload = () => {
  const { signupData } = useSignup();
  const navigate = useNavigate();
  const [files, setFiles] = useState<File | null>(null);

  useEffect(() => {
    if (!signupData.email || !signupData.password) {
      navigate("/signup");
    }
  }, []);

  // Initialize formData outside of the function so it persists
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
      if (files) {
        formData.append("image", files);
      }
      //@ts-ignore
      const response = await Signup(formData);
      if (response.success) {
        toast.success(response.message); // Trigger success toast
        navigate(`/login`);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again."); // Trigger error toast
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <Toaster /> {/* Correct placement of Toaster component */}
      <Link
        className="absolute top-5 px-3 overflow-x-hidden w-full text-black text-[30px] font-bold font-sans"
        to="/"
      >
        <p className="absolute top-5 left-5 text-black text-[30px] font-bold font-sans">
          Glide
        </p>
      </Link>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full h-[100%]">
          <FileUpload onChange={handleFileChange} />
        </div>
        <div className="text-center w-full items-center justify-center">
          <Button onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Upload;
