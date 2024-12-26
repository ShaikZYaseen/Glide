import LocationMap from "./LocationMap";
import PlaceIcon from "@mui/icons-material/Place";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const DriverConfirm = () => {
  return (
    <div className="w-full h-screen bg-white justify-center items-center flex flex-col relative">
      <span className="w-full h-full">
        <LocationMap />
      </span>
      <div className="absolute bottom-0 w-full h-[250px] bg-black">
        <img
          className="h-[140px] w-[140px] object-contain"
          src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSLebVsz1pNjN88Pq7SmusZvBl9BCurZan79fKrkaV_m8tIw4yS"
          alt="car"
        />
        <p className="text-black h-[60px] bg-white flex  mt-3 border border-white w-1/3 p-2 rounded-md items-center justify-center ">
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

        <p className="h-[2px] flex items-center bg-black pr-[200px] justify-center mb-10"></p>
      </div>
    </div>
  );
};

export default DriverConfirm;
