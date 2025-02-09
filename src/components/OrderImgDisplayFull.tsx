import { useEffect, useState } from "react";
import { IOrder } from "../interfaces/orders";

interface IOrderImgDisplayFull {
  order: IOrder;
  currentProduct?: number | null;
  setCurrentProduct?: React.Dispatch<React.SetStateAction<number>> | null;
}

//currentProduct and setCurrentProduct are meant to be used in ProductsInOrder.tsx
function OrderImgDisplayFull({
  order,
  currentProduct,
  setCurrentProduct,
}: IOrderImgDisplayFull) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgLength = order.items.length;

  console.log(order);

  useEffect(() => {
    setCurrentIndex(currentProduct || 0); // syncing currentIndex when currentProduct changes
  }, [currentProduct]);

  useEffect(() => {
    if (setCurrentProduct) {
      setCurrentProduct(currentIndex); // syncing currentProduct when currentIndex changes
    }
  }, [currentIndex, setCurrentProduct]);

  return (
    <div className="w-full h-full flex items-center rounded-lg relative">
      {imgLength > 1 && (
        <button
          className="bg-gray-800 rounded-lg px-2 py-1 absolute left-0 top-1/2 transform -translate-y-1/2 z-10 disabled:opacity-50 duration-300"
          disabled={currentIndex === 0}
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
            }
          }}
        >
          {"<"}
        </button>
      )}

      <div className="w-full h-[20rem] flex flex-col items-center rounded-lg">
        <img
          src={order.items[currentIndex].options.img}
          alt={order.items[currentIndex].options.type}
          className="rounded-lg object-contain h-full m-auto w-full"
        />
        <p className="h-[20%]">
          {currentIndex + 1}/{imgLength}
        </p>
      </div>

      {imgLength > 1 && (
        <button
          className="bg-gray-800 rounded-lg px-2 py-1 absolute right-0 top-1/2 transform -translate-y-1/2 z-10 disabled:opacity-50 duration-300"
          disabled={currentIndex === imgLength - 1}
          onClick={() => {
            if (currentIndex < imgLength - 1) {
              setCurrentIndex(currentIndex + 1);
            }
          }}
        >
          {">"}
        </button>
      )}
    </div>
  );
}

export default OrderImgDisplayFull;
