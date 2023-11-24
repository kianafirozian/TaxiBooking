"use client";
import React, { useEffect, useState } from "react";

export default function AutocompleteAddress() {
  const [source, setSource] = useState<any>("");
  const [addressList, setAddressList] = useState<any>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (source) getAddressList();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [source]);

  const getAddressList = async () => {
    const res = await fetch("/api/search-address?q=" + source, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    setAddressList(result?.searchResult);
  };

  return (
    <div className="mt-5">
      <div>
        <label className="text-gray-400">Where From ?</label>
        <input
          type="text"
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300"
          onChange={(e) => setSource(e.target.value)}
          value={source}
        />
        {addressList?.suggestions ? (
          <div>
            {addressList.suggestions.map((item: any, index: number) => (
              <h2 key={item.mapbox_id}>
                {item.full_address || item.place_formatted}
              </h2>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-3">
        <label className="text-gray-400">Where To ?</label>
        {/* <input
            type="text"
            className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300"
          /> */}
      </div>
    </div>
  );
}
