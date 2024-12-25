import LocationMap from "./LocationMap";

const DriverConfirmation = () => {
  return (
    <div className="w-full h-screen bg-black">
      <span>
        <LocationMap />
      </span>
      <div className="absolute bottom-0  w-full flex flex-col bg-black items-center justify-center z-50 cursor-pointer  h-[270px] text-white px-10 overflow-hidden transition-all duration-500 ease-in-out"></div>
    </div>
  );
};

export default DriverConfirmation;
