import React from "react";
import LocationMap from "../components/ui/LocationMap";

const CaptainHome = () => {
  return (
    <div className="w-full bg-black h-auto">
      <span className="w-full h-full">
        <LocationMap />
      </span>
      <div className="absolute bottom-0 w-full h-[259px]] flex flex-col items-center justify-center bg-black"></div>
    </div>
  );
};

export default CaptainHome;
