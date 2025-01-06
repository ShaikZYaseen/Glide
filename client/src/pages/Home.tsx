import { useContext, useEffect, useState } from "react";
import HomePage from "../components/ui/HomePage";
import RideConfirmComponent from "../components/ui/RideConfirmComponent";
import Ride from "./Ride";
import DriverLoading from "../components/ui/DriverLoading";
import DriverConfirm from "../components/ui/DriverConfirm";
import { SocketContext } from "../context/SocketContext";
import { getLoggedUser } from "../services/auth";

interface Fare {
  fare: number;
  vehicleType: string;
}

const Home = () => {
  const [home, setHome] = useState(true);
  const [rideType, setRideType] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [confirmDriver, setConfirmDriver] = useState(false);
  const [vehicleType, setVehicleType] = useState("");
  const [fares, setFares] = useState<Fare[]>([]);
  const [ride, setRide] = useState();
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [driverLoading, setDriverLoading] = useState(false);
  const { sendMessage, receiveMessage } = useContext(SocketContext) || {};

  // useEffect(()=>{
  //   sendMessage("join",{userType:"user",userId:})
  // },[])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { success, user } = await getLoggedUser();
        console.log(success);
        if (success && sendMessage) {
          sendMessage("join", { userType: "user", userId: user?._id });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [sendMessage]);

  return (
    <div>
      {home && (
        <HomePage
          setHome={setHome}
          setLocation={setLocation}
          setDestination={setDestination}
          location={location}
          destination={destination}
          setRideType={setRideType}
        />
      )}

      {rideType && (
        <Ride
          location={location}
          fares={fares}
          setFares={setFares}
          destination={destination}
          setVehicleType={setVehicleType}
          setConfirmRide={setConfirmRide}
          setRideType={setRideType}
        />
      )}
      {confirmRide && (
        <RideConfirmComponent
          location={location}
          destination={destination}
          vehicleType={vehicleType}
          fares={fares}
          setRide={setRide}
          setConfirmRide={setConfirmRide}
          setDriverLoading={setDriverLoading}
        />
      )}
      {driverLoading && (
        <DriverLoading
          ride={ride}
          setConfirmDriver={setConfirmDriver}
          setDriverLoading={setDriverLoading}
          driverLoading={driverLoading}
        />
      )}
      {confirmDriver && <DriverConfirm />}
    </div>
  );
};

export default Home;
