import { useEffect, useState } from "react";

import EmptyMessage from "../components/EmptyMessage";
import Spinner from "../components/Spinner";
import OrderImgDisplay from "../components/OrderImgDisplayMini";
import { Link } from "react-router-dom";

import { IOrder } from "../interfaces/orders";
import { getDeliveredOrders } from "../api/services";
import { calculateOrderTotalPrice, formatDate } from "../lib/helpers";

function DeliveredOrders() {
  const [deliveredOrdersData, setDeliveredOrdersData] = useState<{
    data: IOrder[];
    count: number;
  }>({ data: [], count: 0 });

  const [page, setPage] = useState(0);
  const perPage = 5;
  const pageCount = Math.ceil(deliveredOrdersData.count / perPage);

  const [isLoading, setIsLoading] = useState(true);

  const startIndex = page * perPage;
  const endIndex = startIndex + perPage - 1;

  useEffect(
    function () {
      async function getOrders(startIndex: number, endIndex: number) {
        setIsLoading(true);
        try {
          //@ts-expect-error data is of correct type
          const { data, count } = await getDeliveredOrders(
            startIndex,
            endIndex
          );
          setDeliveredOrdersData({ data: data as IOrder[], count });
        } catch (error) {
          console.error("Error fetching data:", error);
          setDeliveredOrdersData({ data: [], count: 0 });
        } finally {
          setIsLoading(false);
        }
      }
      getOrders(startIndex, endIndex);
    },
    [startIndex, endIndex]
  );

  return (
    <div className="bg-slate-900 w-full h-screen text-white overflow-y-hidden">
      <div className="w-[80%] h-screen m-auto overflow-y-scroll scrollbar-hide">
        <p className="text-center font-semibold text-4xl p-1 bg-gradient-to-r from-green-500 to-lime-500 bg-clip-text text-transparent">
          Delivered orders
        </p>
        {!isLoading ? (
          deliveredOrdersData?.data.length > 0 ? (
            <>
              <ul className="text-black font-semibold">
                <li className="flex flex-row items-center justify-between bg-gradient-to-r from-green-400 to-green-500 mb-4 mt-4 rounded-lg p-1">
                  <div className="flex flex-row items-center justify-start w-[40%]">
                    <p className="w-[130px] flex items-center justify-center">
                      Image
                    </p>
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap ml-2 text-center">
                      ID
                    </p>
                  </div>
                  <p className="w-[20%] text-center">Prod. count</p>
                  <p className="w-[20%] text-center">Total</p>
                  <p className="w-[20%] text-center">Shipped on</p>
                </li>
              </ul>
              <ul>
                {deliveredOrdersData?.data.map((order: IOrder) => (
                  <Link to={`/order/${order.id}`} key={order.id}>
                    <li className="shadow-2xl hover:scale-95 cursor-pointer duration-150 flex flex-row items-center justify-between bg-gradient-to-r from-green-400 to-green-500 mb-4 rounded-lg h-[130px]">
                      <div className="flex flex-row items-center justify-start w-[40%] rounded-tl-lg">
                        <OrderImgDisplay order={order} />
                        <p className="text-ellipsis overflow-hidden whitespace-nowrap ml-2 text-center">
                          {order.id}
                        </p>
                      </div>
                      <p className="w-[20%] text-center">
                        {order.items.length}
                      </p>
                      <p className="w-[20%] text-center font-medium">
                        {calculateOrderTotalPrice(order.items).toFixed(2)}
                      </p>
                      <p className="w-[20%] text-center font-medium">
                        {formatDate(order.created_at)}
                      </p>
                    </li>
                  </Link>
                ))}
              </ul>
              <div className="flex justify-between mt-3">
                <button
                  className="bg-gray-500 rounded-lg px-4 py-2 font-semibold"
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>
                <p>
                  Page {page + 1}/{pageCount}
                </p>
                <button
                  className="bg-gray-500 rounded-lg px-4 py-2 font-semibold"
                  disabled={deliveredOrdersData?.data.length <= perPage}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <EmptyMessage type="Orders" />
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default DeliveredOrders;
