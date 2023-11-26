"use client";
import React, { useEffect, useState } from "react";

export default function AutocompleteAddress() {
  const [source, setSource] = useState<any>("");
  const [sourceChange, setSourceChange] = useState<any>(false);
  const [destinationChange, setDestinationChange] = useState<any>(false);

  const [addressList, setAddressList] = useState<any>([]);
  const [destination, setDestination] = useState<any>();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (source) getAddressList();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [source, destination]);

  const getAddressList = async () => {
    setAddressList([]);
    const query = sourceChange ? source : destination;
    const res = await fetch("/api/search-address?q=" + query, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    setAddressList(result);
  };

  return (
    <div className="mt-1">
      <div className="relative">
        <label className="text-gray-400 text-[13px]">Where From ?</label>
        <input
          type="text"
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300 text-[14px]"
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true);
          }}
        />
        {addressList?.suggestions && sourceChange ? (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
            {addressList.suggestions.map((item: any, index: number) => (
              <h2
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSource(item.place_formatted || item.full_address);
                  setAddressList([]);
                  setSourceChange(false);
                }}
                key={item.mapbox_id}
              >
                {item.full_address || item.place_formatted}
              </h2>
            ))}
          </div>
        ) : null}
      </div>

      <div className="">
        <label className="text-gray-400 text-[13px]">Where To ?</label>
        <input
          type="text"
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300 text-[14px]"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            setDestinationChange(true);
          }}
        />
        {addressList?.suggestions && destinationChange ? (
          <div
            className="shadow-md p-1 rounded-md
            absolute w-full bg-white"
          >
            {addressList?.suggestions.map((item: any, index: number) => (
              <h2
                key={index}
                className="p-3 hover:bg-gray-100
                cursor-pointer"
                onClick={() =>
                  console.log("destinationChange", destinationChange)
                }
              >
                {item.full_address || item.place_formatted}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
