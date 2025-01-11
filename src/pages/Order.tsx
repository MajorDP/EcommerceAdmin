import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Map from "../components/Map";
import Spinner from "../components/Spinner";
import { calculateOrderTotalPrice, formatDate } from "../lib/helpers";
import OrderImgDisplayFull from "../components/OrderImgDisplayFull";

import { IOrder } from "../interfaces/orders";
import { IProductOwner } from "../interfaces/users";
import { getOrderById, getProductOwner } from "../api/services";

function Order() {
  const { id } = useParams();

  const [order, setOrder] = useState<IOrder | null>(null);
  const [productOwner, setProductOwner] = useState<IProductOwner | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  console.log(order?.mapLocation[0]);
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

  if (isLoading) return <Spinner />;
  return (
    <div className="bg-slate-900 w-full h-screen text-white flex items-center justify-center">
      <div className="bg-slate-700 w-[80%] h-[80%] rounded-lg p-4 overflow-y-auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <p className="text-center font-semibold text-4xl p-1 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Order: #{order?.id}
            </p>
            <div className="w-full flex flex-col lg:flex-row mt-5 text-lg">
              <div className="w-[50%] min-h-[10rem] max-h-[20rem] rounded-lg">
                <OrderImgDisplayFull order={order} />
              </div>
              <div className="flex flex-col w-[60%] px-6 justify-between">
                <div>
                  <div className="flex flex-row justify-between">
                    <p className="mt-4">
                      <span className="font-semibold">ID:</span> {order?.id}
                    </p>
                    <p className="mt-4">
                      <span className="font-semibold">
                        Posted on/Last edited on:
                      </span>{" "}
                      {formatDate(order?.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between mt-4">
                    {productOwner !== null ? (
                      <>
                        <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                          <span className="font-semibold">Posted by: </span>
                          {productOwner.username}
                        </p>
                        <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                          <span className="font-semibold">Email: </span>
                          {productOwner.email}
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="text-ellipsis overflow-hidden whitespace-nowrap font-semibold">
                          Posted by: Ecomms
                        </span>
                        <span className="text-ellipsis overflow-hidden whitespace-nowrap font-semibold">
                          Email: Ecomms@gmail.com
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex flex-row justify-between w-full mt-4">
                    <p>
                      <span className="font-semibold">Products count:</span>{" "}
                      {order?.items.length}
                    </p>
                    <p>
                      <span className="font-semibold">Total:</span>{" "}
                      {calculateOrderTotalPrice(order?.items).toFixed(2)} $
                    </p>
                  </div>
                  <div className="flex flex-row justify-between w-full mt-4">
                    <p>
                      <span className="font-semibold">Order status:</span>{" "}
                      {order?.status}
                    </p>
                    <p className="hover:scale-105 duration-300">
                      <Link
                        to={`/orders/edit/${id}`}
                        className="bg-green-500 px-4 py-1 shadow-lg rounded-lg text-sm"
                      >
                        Change order status
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="text-xs lg:text-lg w-full lg:w-[80%] m-auto">
          <p className="text-center mt-6 py-2 text-xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold">
            Client's details
          </p>
          <div className="flex flex-row justify-between mt-5">
            <div className="flex flex-col">
              <p>
                <span className="font-semibold">Client's name: </span>
                <span>{order?.orderDetails[0].fullName}</span>
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                <span>{order?.orderDetails[0].email}</span>
              </p>
              <p>
                <span className="font-semibold">Phone number: </span>
                <span>{order?.orderDetails[0].phone}</span>
              </p>
            </div>
            <div className="flex flex-col">
              <p>
                <span className="font-semibold">Physical address: </span>
                <span>{order?.orderDetails[0].physicalAddress}</span>
              </p>
              <p>
                <span className="font-semibold">Postal code: </span>
                <span>{order?.orderDetails[0].postalCode}</span>
              </p>
              <p>
                <span className="font-semibold">Way of payment: </span>
                {/*ONLY POSSIBLE OPTION CURRENTLY */}
                <span>In chash, on delivery</span>
              </p>
            </div>
          </div>
        </div>
        <p className="text-center mt-6 py-2 text-xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold">
          Location on map:
        </p>
        {order?.mapLocation !== undefined ? (
          <>
            <div className="mt-5 w-full h-full m-auto rounded-lg overflow-hidden border-2 border-black">
              <Map mapLocation={order?.mapLocation[0]} />
            </div>
          </>
        ) : (
          <p className="text-red-500 font-semibold w-[50%] text-center m-auto flex items-center justify-center">
            There was an error loading map location.
          </p>
        )}
      </div>
    </div>
  );
}

export default Order;
