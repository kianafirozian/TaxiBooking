"use client";
import React, { useEffect } from "react";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";

function Booking() {
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      {window !== undefined && (
        <div
          className="border-[1px] p-5 rounded-md"
          style={{ height: window.innerHeight * 0.72 }}
        >
          <AutocompleteAddress />
          <Cars />
        </div>
      )}
    </div>
  );
}

export default Booking;
