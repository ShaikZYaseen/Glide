import React from "react";
import PlaceIcon from "@mui/icons-material/Place";

const LocationPanel = () => {
  return (
    <div className="w-screen h-screen mt-[180px] z-100 bg-zinc-800">
      <p className="text-white text-[14px] w-full text-start pl-[240px] bg-zinc-600 p-2">
        <PlaceIcon className="text-white p-2" />
        Bengaluru Marriott Hotel Whitefield
      </p>
    </div>
  );
};

export default LocationPanel;
