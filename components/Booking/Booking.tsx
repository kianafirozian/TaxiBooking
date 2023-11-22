import React from "react";
import AutocompleteAddress from "./AutocompleteAddress";

export default function Booking() {
  const screenHeight = window.innerWidth;
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div
        className="border-[2px] p-5 rounded-md"
        style={{ height: screenHeight * 0.72 }}
      >
        <AutocompleteAddress />
      </div>
    </div>
  );
}
