import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import LocationMap from "./LocationMap";
import PlaceIcon from "@mui/icons-material/Place";
import ME from "../../assets/ME.jpeg";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DriverConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      gsap.to(dropdownRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(dropdownRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });
    }
  };

  return (
    <div className="w-full h-screen bg-white justify-center items-center flex flex-col relative">
      <span className="w-full h-full">
        <LocationMap />
      </span>
      <div className="absolute bottom-0 w-full h-auto flex flex-col items-center justify-center bg-black">
        <div className="flex justify-center items-center">
          <span className="h-[140px] w-[140px] rounded-[50%]">
            <img
              className="h-full w-full rounded-[20px] object-contain"
              src={ME}
              alt="car"
            />
          </span>

          <div className="flex flex-col ml-[40px] p-5 text-white">
            <span className=" text-[25px] font-bold">Shaik Yaseen</span>
            <span className="text-[10px]">MP04 AB 1234</span>
            <span className="text-[14px] font-bold">Maruti Suzuki Alto</span>
          </div>
        </div>

        <p className="text-black h-[60px] bg-white flex mt-3 border border-white w-1/3 p-2 rounded-md items-center justify-center ">
          <div className="p-2">
            <PlaceIcon />
          </div>
          <div className="flex flex-col">
            <span>562/11-A</span>
            <span>Rayalseema,Kadapa</span>
          </div>
        </p>
        <div className="w-full flex justify-center items-center">
          <div className="mr-3 mt-3 flex justify-center">
            <button
              //   onClick={toggleDropdown}
              className="bg-gray-800 text-white p-2 rounded-md flex items-center"
            >
              Let's go
            </button>
          </div>

          <div className=" mt-3 flex justify-center">
            <button
              onClick={toggleDropdown}
              className="bg-gray-800 text-white p-2 rounded-md flex items-center"
            >
              Toggle Details
              <ExpandMoreIcon
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div
          ref={dropdownRef}
          className="overflow-hidden bg-gray-200 w-1/2 mt-2 p-4 flex flex-col text-black"
          style={{ height: 0, opacity: 0 }}
        >
          <p className="text-[20px] font-sans font-bold">
            Additional Trip Details
          </p>
          <p className="text-[10px] font-bold">Pickup Time: 10:00 AM</p>
          <p className="text-[10px] font-bold">Drop Time: 11:30 AM</p>
        </div>
      </div>
    </div>
  );
};

export default DriverConfirm;
