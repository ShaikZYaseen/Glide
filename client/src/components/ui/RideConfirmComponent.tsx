import LocationMap from "./LocationMap";

const RideConfirmComponent = () => {
  return (
    <div className="w-full h-screen bg-black">
      <span className="w-full h-full">
        <LocationMap />
      </span>
      <div className="absolute bottom-0 w-full flex flex-col items-center justify-center  z-50 cursor-pointer bg-black text-white px-10 h-[270px]">
        <p className="text-white text-2xl font-bold">Confirm you ride</p>
        <img
          className="h-[140px] w-[140px] object-contain"
          src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSLebVsz1pNjN88Pq7SmusZvBl9BCurZan79fKrkaV_m8tIw4yS"
          alt="car"
        />
        <button className="bg-green-500 w-1/5 p-2 rounded-md text-white font-bold">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default RideConfirmComponent;
