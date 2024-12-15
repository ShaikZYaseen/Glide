import React from "react";
import { FileUpload } from "../components/ui/Upload";
import { Link } from "react-router-dom";

const Upload = () => {
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

      <FileUpload />
    </div>
  );
};

export default Upload;
