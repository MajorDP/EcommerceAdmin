import { useEffect, useState } from "react";
import { IOrder } from "../interfaces/orders";
import { getOrders } from "../api/services";
import { Link } from "react-router-dom";
import OrderImgDisplayMini from "../components/OrderImgDisplayMini";
import { calculateOrderTotalPrice, formatDate } from "../lib/helpers";
import EmptyMessage from "../components/EmptyMessage";
import Spinner from "../components/Spinner";

function Orders() {
  const [ordersData, setOrdersData] = useState<{
    data: IOrder[];
    count: number;
  }>({ data: [], count: 0 });

  const [page, setPage] = useState(0);
  const perPage = 5;
  const pageCount = Math.ceil(ordersData.count / perPage);

  const [isLoading, setIsLoading] = useState(true);

  const startIndex = page * perPage;
  const endIndex = startIndex + perPage - 1;

  const [dateFrom, setDateFrom] = useState(0);
  const [sortValue, setSortValue] = useState("");

  useEffect(
    function () {
      async function getAllOrders(startIndex: number, endIndex: number) {
        setIsLoading(true);
        try {
          //@ts-expect-error data is of correct type
          const { data, count } = await getOrders(
            startIndex,
            endIndex,
            dateFrom,
            sortValue
          );
          setOrdersData({ data: data as IOrder[], count });
        } catch (error) {
          console.error("Error fetching data:", error);
          setOrdersData({ data: [], count: 0 });
        } finally {
          setIsLoading(false);
        }
      }
      getAllOrders(startIndex, endIndex);
    },
    [startIndex, endIndex, dateFrom, sortValue]
  );

  return (
    <div className="bg-slate-900 w-full h-screen text-white overflow-y-hidden">
      <div className="w-[80%] h-screen m-auto overflow-y-scroll scrollbar-hide">
        <p
          className={`text-center font-semibold p-1 text-4xl bg-gradient-to-r from-green-500 to-lime-500 bg-clip-text text-transparent`}
        >
          All orders
        </p>
        <div className="flex flex-row items-center justify-center mt-3">
          <div className="flex flex-col items-center mr-2">
            <p className="mb-1">From the last</p>
            <select
              defaultValue={dateFrom}
              onChange={(e) => setDateFrom(Number(e.target.value))}
              className={`px-3 rounded-lg text-black py-1 m-auto bg-slate-400 cursor-pointer`}
            >
              <option value={0}>Show all</option>
              <option value={1}>Last Day</option>
              <option value={7}>Last Week</option>
              <option value={30}>Last Month</option>
              <option value={365}>Last Year</option>
            </select>
          </div>
          <div className="flex flex-col items-center">
            <p className="mb-1">Sort by</p>
            <select
              defaultValue={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
              className={`px-3 rounded-lg text-black py-1 m-auto bg-slate-400 cursor-pointer`}
            >
              <option value={""}>Default</option>
              <option value={"priceAsc"}>Price (Lowest-up)</option>
              <option value={"priceDesc"}>Price (Highest-up)</option>
              <option value={"idAsc"}>Product ID (Asc)</option>
              <option value={"idDesc"}>Product ID (Desc)</option>
              <option value={"countAsc"}>Product count (Lowest-up)</option>
              <option value={"countDesc"}>Product count (Highest-up)</option>
            </select>
          </div>
        </div>
        {!isLoading ? (
          ordersData?.data.length > 0 ? (
            <>
              <ul className="text-black font-semibold">
                <li
                  className={`flex flex-row items-center justify-between bg-gradient-to-r from-green-500 to-lime-500 mb-4 mt-4 rounded-lg p-1`}
                >
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
                  <p className="w-[20%] text-center">Date of order</p>
                </li>
              </ul>
              <ul>
                {ordersData?.data.map((order: IOrder) => (
                  <Link to={`/orders/${order.id}`} key={order.id}>
                    <li
                      className={`shadow-2xl hover:scale-95 cursor-pointer duration-150 flex flex-row items-center justify-between bg-gradient-to-r ${
                        order.status === "Shipping"
                          ? "from-blue-400 to-blue-800"
                          : order.status === "Rejected"
                          ? "from-red-400 to-red-800"
                          : order.status === "Unconfirmed"
                          ? "from-orange-400 to-orange-500"
                          : "from-green-400 to-green-500"
                      }  mb-4 rounded-lg h-[130px]`}
                    >
                      <div className="flex flex-row items-center justify-start w-[40%] rounded-tl-lg">
                        <OrderImgDisplayMini order={order} />
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
                  disabled={ordersData?.data.length <= perPage}
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

export default Orders;
