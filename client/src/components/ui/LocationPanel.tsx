import React from "react";
import PlaceIcon from "@mui/icons-material/Place";

const LocationPanel = () => {
  const options = [
    "Bengaluru Marriott Hotel Whitefield",
    "Bengaluru Marriott Hotel Whitefield",
    "Bengaluru Marriott Hotel Whitefield",
    "Bengaluru Marriott Hotel Whitefield",
    "Bengaluru Marriott Hotel Whitefield",
  ];
  return (
    <div className="w-screen h-screen mt-[180px] z-100 bg-zinc-800">
      {options &&
        options.map((option, index) => (
          <p
            key={index}
            className="text-white text-[14px] w-full flex items-center text-start pl-[240px] bg-white p-3 shadow-sm"
          >
            <PlaceIcon className="text-black" />
            <span className="ml-2 text-black">{option}</span>
          </p>
        ))}
    </div>
  );
};

export default LocationPanel;
