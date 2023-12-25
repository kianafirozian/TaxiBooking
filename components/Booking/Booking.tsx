import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

function Booking() {
  // const screenHeight = window.innerHeight*0.72;

  const router: any = useRouter();

  const { carAmonut, setCarAmount } = useContext(SelectedCarAmountContext);

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div className="border-[1px] p-5 rounded-md">
        <AutocompleteAddress />
        <Cars />
        <Cards />
        <button
          className={`w-full bg-yellow-400
          p-1 rounded-md mt-4 ${!carAmonut ? `bg-gray-200` : null} `}
          disabled={!carAmonut}
          onClick={() => router.push("/payment")}
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default Booking;
