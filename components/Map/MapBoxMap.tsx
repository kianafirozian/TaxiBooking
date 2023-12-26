"use client";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useContext, useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map } from "react-map-gl";
import Markers from "./Markers";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";

const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";

const session_token = "5ccce4a4-ab0a-4a7c-943d-580e55542363";

function MapBoxMap() {
  const mapRef = useRef<any>();

  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  const { sourceCordinates, setSourceCordinates } =
    useContext(SourceCordiContext);

  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );

  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  // console.log("direct", directionData);

  // use fly to source marker location
  useEffect(() => {
    if (sourceCordinates) {
      mapRef.current?.flyTo({
        center: [sourceCordinates.lng, sourceCordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCordinates]);

  // use fly to destination markers location
  useEffect(() => {
    if (destinationCordinates) {
      mapRef.current?.flyTo({
        center: [destinationCordinates.lng, destinationCordinates.lat],
        duration: 2500,
      });
    }
    if (sourceCordinates && destinationCordinates) {
      getDirectionRoute();
    }
  }, [destinationCordinates]);

  const getDirectionRoute = async () => {
    const res = await fetch(
      MAPBOX_DRIVING_ENDPOINT +
        sourceCordinates.lng +
        "," +
        sourceCordinates.lat +
        ";" +
        destinationCordinates.lng +
        "," +
        destinationCordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    // console.log(result);
    setDirectionData(result);
  };

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 550, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />

            {directionData?.routes ? (
              <MapBoxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>
      <div className="absolute bottom-[270px] z-20 right-[20px] hidden md:block">
        <DistanceTime />
      </div>
    </div>
  );
}

export default MapBoxMap;
