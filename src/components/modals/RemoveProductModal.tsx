import { useState } from "react";
import { removeProduct } from "../../api/services";

interface IQuantityIncreaseModal {
  setModalState: React.Dispatch<React.SetStateAction<string | null>>;
  productId: number;
}
function RemoveProductModal({
  setModalState,
  productId,
}: IQuantityIncreaseModal) {
  const [error, setError] = useState<string | null>(null);

  const handleRemove = async () => {
    const error = await removeProduct(productId);
    if (error) {
      setError(error.message);
      return;
    }
  };
  return (
    <div className="rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-[25%] bg-gray-600 z-20 flex flex-col items-center">
      <h1 className="text-center text-xl mt-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold">
        Remove product
      </h1>
      <p className="text-red-500 text-center mt-2 w-[80%]">
        Are you sure you want to permanently remove Product #{productId}
      </p>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      <div className="flex flex-row w-[50%] justify-between m-auto mt-2">
        <button
          className="bg-red-400 px-2 py-1 rounded-lg hover:scale-105 hover:bg-red-500 duration-300"
          onClick={() => setModalState(null)}
        >
          No
        </button>
        <button
          className="bg-green-400 px-2 py-1 rounded-lg hover:scale-105 hover:bg-green-500 duration-300 disabled:bg-slate-600 disabled:text-slate-400"
          onClick={() => handleRemove()}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default RemoveProductModal;
