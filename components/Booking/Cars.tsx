"use client";
import CarsList from "@/data/CarsList";
import Image from "next/image";
import { useState } from "react";

function Cars() {
  const [selectedCar, setSelectedCar] = useState<any>();
  return (
    <div className="mt-3">
      <h2 className="font-semibold">Select Car</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {CarsList.map((item, index) => (
          <div
            key={index}
            className={`m-2 p-2 border-[1px] rounded-md hover:border-yellow-400 cursor-pointer ${
              index === selectedCar ? "border-yellow-400 border-[2px]" : null
            }`}
            onClick={() => setSelectedCar(index)}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={75}
              height={90}
              className="w-full"
            />
            <h2 className="text-[12px] text-gray-500">{item.name}</h2>
            <span className="float-right text-black font-medium">
              {item.charges * 8} $
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
