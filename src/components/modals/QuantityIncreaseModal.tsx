import { useState } from "react";
import { updateQuantity } from "../../api/services";

interface IQuantityIncreaseModal {
  setModalState: React.Dispatch<React.SetStateAction<string | null>>;
  currQuantity: number;
  productId: number;
}
function QuantityIncreaseModal({
  setModalState,
  currQuantity,
  productId,
}: IQuantityIncreaseModal) {
  const [quantity, setQuantity] = useState(currQuantity);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    if (quantity === currQuantity) {
      setModalState(null);
      return;
    }
    const error = await updateQuantity(productId, quantity);
    if (error) {
      setError(error.message);
      return;
    }
  };
  return (
    <div className="rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-gray-600 z-20">
      <h1 className="text-center text-xl mt-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold">
        Increase Quantity
      </h1>
      <div className="flex flex-col mt-2 w-full justify-center items-center text-lg">
        <label className="text-white">
          Set quantity of Product #{productId} to:
        </label>
        <input
          defaultValue={currQuantity}
          min={currQuantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
          }}
          type="number"
          className="rounded-lg px-2 py-1"
        />
      </div>
      {quantity < currQuantity && (
        <p className="text-red-500 text-center mt-2">
          New quantity needs to be larger than current quantity.
        </p>
      )}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      <div className="flex flex-row w-[50%] justify-between m-auto mt-2">
        <button
          className="bg-red-400 px-2 py-1 rounded-lg hover:scale-105 hover:bg-red-500 duration-300"
          onClick={() => setModalState(null)}
        >
          Cancel
        </button>
        <button
          className="bg-green-400 px-2 py-1 rounded-lg hover:scale-105 hover:bg-green-500 duration-300 disabled:bg-slate-600 disabled:text-slate-400"
          onClick={() => handleUpdate()}
          disabled={quantity <= currQuantity}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default QuantityIncreaseModal;
