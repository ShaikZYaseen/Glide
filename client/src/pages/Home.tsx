import { useState } from "react";
import HomePage from "../components/ui/HomePage";
import RideConfirmComponent from "../components/ui/RideConfirmComponent";
import Ride from "./Ride";
import DriverLoading from "../components/ui/DriverLoading";
import DriverConfirm from "../components/ui/DriverConfirm";

const Home = () => {
  const [home, setHome] = useState(true);
  const [rideType, setRideType] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [confirmDriver, setConfirmDriver] = useState(false);
  const [driverLoading, setDriverLoading] = useState(false);
  return (
    <div>
      {home && <HomePage setHome={setHome} setRideType={setRideType} />}

      {rideType && (
        <Ride setConfirmRide={setConfirmRide} setRideType={setRideType} />
      )}
      {confirmRide && (
        <RideConfirmComponent
          setConfirmRide={setConfirmRide}
          setDriverLoading={setDriverLoading}
        />
      )}
      {driverLoading && (
        <DriverLoading
          setConfirmDriver={setConfirmDriver}
          setDriverLoading={setDriverLoading}
        />
      )}
      {confirmDriver && <DriverConfirm />}
    </div>
  );
};

export default Home;
