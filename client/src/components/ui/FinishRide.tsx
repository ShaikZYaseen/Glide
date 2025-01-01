import PlaceIcon from "@mui/icons-material/Place";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const FinishRide = () => {
  return (
    <div className="w-full h-auto flex flex-col bg-black justify-center items-center">
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

      <button
        // onClick={() => {
        //   navigate("/captain-riding");
        // }}
        className="bg-green-500 w-[140px] p-2 mt-5 mb-2  rounded-md text-white font-bold"
      >
        Finish ride
      </button>
      <p className="text-white w-1/2 text-center font-semibold text-[13px]">
        Click on finish ride button, if you have completed the payment thing
      </p>
    </div>
  );
};

export default FinishRide;
