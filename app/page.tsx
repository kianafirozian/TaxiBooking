"use client";
import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();

  const [sourceCordinates, setSourceCordinates] = useState<any>([]);

  const [destinationCordinates, setDestinationCordinates] = useState<any>([]);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };
  return (
    <div>
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCordiContext.Provider
          value={{ sourceCordinates, setSourceCordinates }}
        >
          <DestinationCordiContext.Provider
            value={{ destinationCordinates, setDestinationCordinates }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div>
                <Booking />
              </div>
              <div className="col-span-2">
                <MapBoxMap />
              </div>
            </div>
          </DestinationCordiContext.Provider>
        </SourceCordiContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
