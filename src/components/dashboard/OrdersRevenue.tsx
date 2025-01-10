import { useEffect, useState } from "react";
import { getTotalRevenue } from "../../api/services";
import Spinner from "../Spinner";

function OrdersRevenue() {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [dateFrom, setDateFrom] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function getOrdersSummary() {
        setIsLoading(true);
        const orderTypesCount = await getTotalRevenue(dateFrom);
        setTotalRevenue(orderTypesCount as number);
        setIsLoading(false);
      }
      getOrdersSummary();
    },
    [dateFrom]
  );

  return (
    <>
      <p className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 mb-6">
        Total Revenue
      </p>
      {!isLoading ? (
        <>
          <p className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500 mb-10 animate-pulse">
            {totalRevenue} $
          </p>
          <div className="flex items-center">
            <select
              defaultValue={dateFrom}
              onChange={(e) => setDateFrom(Number(e.target.value))}
              className={`px-3 rounded-lg text-black py-1 m-auto bg-slate-400 cursor-pointer`}
            >
              <option defaultValue={dateFrom}>From:</option>
              <option value={1}>Last Day</option>
              <option value={7}>Last Week</option>
              <option value={30}>Last Month</option>
              <option value={365}>Last Year</option>
            </select>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default OrdersRevenue;
