import React, { useState, useEffect, useRef } from "react";
import LocationMap from "./LocationMap";
import PlaceIcon from "@mui/icons-material/Place";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { gsap } from "gsap";

const ConfirmRidepopup = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleVisibility = () => {
    setIsExpanded(!isExpanded); // Toggle the state
  };

  useEffect(() => {
    if (containerRef.current) {
      if (isExpanded) {
        gsap.to(containerRef.current, {
          duration: 0.5,
          height: "510px",
          opacity: 1,
          ease: "power2.out",
        });
      } else {
        gsap.to(containerRef.current, {
          duration: 0.5,
          height: 0,
          opacity: 0,
          ease: "power2.inOut",
        });
      }
    }
  }, [isExpanded]);

  return (
    <div className="w-full bg-black h-screen  relative overflow-hidden">
      <span className="w-full h-full">
        <LocationMap />
      </span>
      <div
        onClick={toggleVisibility}
        style={{ zIndex: 1000 }}
        className="absolute bottom-0 w-full h-auto flex justify-center items-center z-50 cursor-pointer bg-black text-white"
      >
        <div
          ref={containerRef}
          className="absolute bottom-0 h-auto  w-full flex flex-col bg-black items-center justify-center z-50 cursor-pointer  text-white px-10 overflow-hidden transition-all duration-500 ease-in-out"
        >
          <div className="flex justify-around w-1/3 items-center p-3">
            <img
              className="h-[70px] w-[70px] rounded-[50%] object-cover"
              src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZXN8ZW58MHx8MHx8fDA%3D"
            ></img>
            <p>Harsh patel</p>
            <p className="text-[10px] font-bold">
              Distance : <span className="font-bold text-[10px]"> 10km</span>
            </p>
          </div>
          <div className="w-full h-auto flex flex-col bg-black justify-center items-center">
            <p className="text-black h-[60px] bg-white flex   border border-white w-1/3 p-2 rounded-md items-center justify-center ">
              <div className="p-2">
                <PlaceIcon />
              </div>
              <div className="flex flex-col">
                <span>562/11-A</span>
                <span>Rayalseema,Kadapa</span>
              </div>
            </p>

            <p className="text-black h-[60px] bg-white flex mt-3 border border-white w-1/3 p-2 rounded-md items-center justify-center ">
              <div className="p-2">
                <PlaceIcon />
              </div>
              <div className="flex flex-col">
                <span>562/11-A</span>
                <span>Rayalseema,Kadapa</span>
              </div>
            </p>

            <p className="text-black h-[60px] bg-white flex mt-3  border border-white w-1/3 p-2 pr-[70px] rounded-md items-center justify-center ">
              <div className="p-1 text-[20px]">
                <CurrencyRupeeIcon className="w-full h-full" />
              </div>
              <div className="flex flex-col   ">
                <span>193.20</span>
                <span>cash cash</span>
              </div>
            </p>

            <div className="overflow-hidden flex flex-col justify-center items-center mt-[25px]">
              <button
                // onClick={() => {
                //   setDriverLoading(true);
                //   setConfirmRide(false);
                // }}
                className="bg-green-500 w-[200px] p-2  rounded-md text-white font-bold"
              >
                Confirm
              </button>
              <button
                // onClick={() => {
                //   setDriverLoading(true);
                //   setConfirmRide(false);
                // }}
                className="bg-gray-300 mt-3 w-[200px] p-2 rounded-md text-white font-bold"
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
        <p className="text-white text-xl z-1000000 p-3 mr-2 font-bold">
          New ride available
        </p>
        {isExpanded ? (
          <ExpandLess fontSize="large" className="text-white" />
        ) : (
          <ExpandMore fontSize="large" className="text-white" />
        )}
      </div>
    </div>
  );
};

export default ConfirmRidepopup;
