import { useState } from "react";

//@ts-expect-error aaa
function OrderImgDisplayFull({ order }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgLength = order.items.length;
  console.log(currentIndex);
  return (
    <div className="w-full h-full flex items-center rounded-lg relative">
      {/* Left Button */}
      <button
        className="bg-gray-800 rounded-lg px-2 py-1 absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
        onClick={() => {
          if (currentIndex !== 0) {
            setCurrentIndex(currentIndex - 1);
          }
        }}
      >
        {"<"}
      </button>

      {/* Image Container */}
      <div className="w-full h-[20rem] flex flex-col items-center rounded-lg">
        <img
          src={order.items[currentIndex].options.img}
          className="rounded-lg object-contain h-full m-auto w-full"
        />
        <p className="h-[20%]">
          {currentIndex + 1}/{imgLength}
        </p>
      </div>

      {/* Right Button */}
      <button
        className="bg-gray-800 rounded-lg px-2 py-1 absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
        onClick={() => {
          if (currentIndex < imgLength - 1) {
            setCurrentIndex(currentIndex + 1);
          }
        }}
      >
        {">"}
      </button>
    </div>
  );
}

export default OrderImgDisplayFull;
