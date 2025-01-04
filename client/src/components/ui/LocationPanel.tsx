import React from "react";
import PlaceIcon from "@mui/icons-material/Place";

interface Suggestion {
  id: string;
  place_name: string;
  coordinates: number[];
}

interface LocationPanelProps {
  suggestions: Suggestion[];
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setSuggestions: React.Dispatch<React.SetStateAction<never[]>>;
}

const LocationPanel: React.FC<LocationPanelProps> = ({
  suggestions,
  setLocation,
  setDestination,
  setSuggestions,
}) => {
  const handleClick = (
    e: React.MouseEvent<HTMLSpanElement>,
    option: Suggestion
  ) => {
    setLocation(option.place_name); // Update location
    setDestination(option.place_name); // Update destination
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="w-screen h-screen mt-[180px] z-100 bg-zinc-800">
      {suggestions &&
        suggestions.map((option) => (
          <span
            key={option.id} // Use unique `id` as the key
            className="text-white text-[14px] w-full flex items-center cursor-pointer text-start pl-[180px] hover:bg-gray-200 bg-white p-3 shadow-sm"
            onClick={(e) => handleClick(e, option)}
          >
            <PlaceIcon className="text-black" />
            <span className="ml-2 text-black">{option.place_name}</span>
          </span>
        ))}
    </div>
  );
};

export default LocationPanel;
