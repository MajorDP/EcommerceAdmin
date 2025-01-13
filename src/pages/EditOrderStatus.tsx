import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Spinner from "../components/Spinner";

import { IOrder } from "../interfaces/orders";
import { IProductOwner } from "../interfaces/users";
import {
  getOrderById,
  getProductOwner,
  updateOrderStatus,
} from "../api/services";
import OrderOverview from "../components/OrderOverview";
import ProductsInOrder from "../components/ProductsInOrder";
import Map from "../components/Map";

function EditOrderStatus() {
  const { id } = useParams();

  const [order, setOrder] = useState<IOrder | null>(null);
  const [productOwner, setProductOwner] = useState<IProductOwner | null>(null);

  const [status, setStatus] = useState<string>(order?.status || "");
  const options = ["Unconfirmed", "Shipping", "Rejected", "Delivered"];
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getOrder() {
      const order: IOrder = await getOrderById(id);
      if (order.orderedBy !== null) {
        const owner = await getProductOwner(order.orderedBy);
        setProductOwner(owner as IProductOwner);
      }
      setOrder(order as IOrder);
      setIsLoading(false);
    }
    getOrder();
  }, [id]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (formData.get("status") === "" || formData.get("reason") === "") {
      setError("Both fields must be filled before submitting.");
      return;
    }

    const { error } = await updateOrderStatus(
      id,
      {
        status: formData.get("status"),
        reason: formData.get("reason"),
      },
      order?.items
    );

    if (error?.message) {
      setError(error.message);
      return;
    } else {
      console.log("awawa");
    }
  };

  return (
    <div className="bg-slate-900 w-full h-screen text-white flex items-center justify-center">
      <div className="bg-slate-700 w-[80%] h-[80%] rounded-lg p-4 overflow-y-auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="text-center font-semibold text-4xl p-1 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Edit Order: #{order?.id}
            </h1>
            {order !== null ? (
              <>
                <div className="">
                  <h2 className="text-center mt-6 py-2 text-xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold">
                    Change order status
                  </h2>
                  <form
                    //@ts-expect-error ignore e
                    onSubmit={(e) => handleSubmit(e)}
                    className="w-full lg:w-[60%] h-full m-auto flex flex-col justify-between lg:justify-center mt-4 text-lg"
                  >
                    <div className="flex h-full flex-row justify-between items-center w-full">
                      <div className="text-center w-[50%]">
                        <p className="font-semibold">From:</p>
                        <p
                          className={`bg-gradient-to-r bg-clip-text text-transparent ${
                            order.status === "Shipping"
                              ? "from-blue-400 to-blue-800"
                              : order.status === "Rejected"
                              ? "from-red-400 to-red-800"
                              : order.status === "Unconfirmed"
                              ? "from-orange-400 to-orange-500"
                              : "from-green-400 to-green-500"
                          }`}
                        >
                          {order.status}
                        </p>
                        <div>
                          <p className="text-center font-semibold">To:</p>
                          <select
                            name="status"
                            defaultValue={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={`ml-1 px-3 rounded-lg text-black py-1 w-fit bg-slate-400 cursor-pointer`}
                          >
                            <option value={""}>Choose</option>
                            {options.map(
                              (option, index) =>
                                option !== order.status && (
                                  <option key={index} value={option}>
                                    {option}
                                  </option>
                                )
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between w-[50%] h-[10rem]">
                        <p className="text-center">Reason for descision:</p>
                        <textarea
                          name="reason"
                          className="w-full h-full text-black border-2 border-black rounded-lg"
                          readOnly={false}
                        />
                      </div>
                    </div>
                    {error !== null && (
                      <p className="text-center text-red-500 font-semibold mt-2">
                        {error}
                      </p>
                    )}
                    <label className="text-slate-400 text-sm text-center flex flex-row mt-4">
                      <input
                        className="w-8 h-8 mr-2"
                        type="checkbox"
                        onChange={() => setIsConfirmed(!isConfirmed)}
                      />{" "}
                      I confirm I have thoroughly checked the availability of
                      the products in the order, that the order is within the
                      borders of Bulgaria, that the descision for the order is
                      correct, etc.
                    </label>
                    <button
                      type="submit"
                      disabled={!isConfirmed}
                      className="my-5 px-2 py-1 bg-green-500 w-fit m-auto rounded-lg hover:bg-green-600 enabled:hover:scale-105 duration-300 disabled:bg-slate-400"
                    >
                      Submit change
                    </button>
                  </form>
                </div>
                <OrderOverview
                  order={order}
                  productOwner={productOwner}
                  id={id as string}
                />
                <ProductsInOrder order={order} productOwner={productOwner} />
                <Map mapLocation={order?.mapLocation[0]} showHeader={true} />
              </>
            ) : (
              <p className="text-red-500 font-semibold w-[50%] text-center m-auto flex items-center justify-center">
                There was an error loading order details.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default EditOrderStatus;
