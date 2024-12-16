import { FileUpload } from "../components/ui/Upload";
import { Link } from "react-router-dom";
import { useSignup } from "../context/SignupContext";
import Button from "../components/Button";

const Upload = () => {
  const { signupData, setSignupData } = useSignup();

  const handleFileChange = (files: File[]) => {
    setSignupData(
      { image: files[0] } // Store the first file in the photo field
    );
    console.log("Hitting", signupData);
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
              console.log(signupData);
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
