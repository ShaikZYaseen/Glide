import { FileUpload } from "../components/ui/Upload";
import { Link } from "react-router-dom";
import { useSignup } from "../context/SignupContext";
import Button from "../components/ui/Button";
import { Signup } from "../services/auth";

const CaptainUpload = () => {
  const { signupData, setSignupData } = useSignup();

  const handleFileChange = (files: File[]) => {
    setSignupData(
      { image: files[0] } // Store the first file in the photo field
    );
    console.log("Hitting", signupData);
  };

  const handleSubmit = async () => {
    try {
      console.log(signupData, "OO");
      const response = await Signup(signupData);
      console.log(response);
    } catch (error) {
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
