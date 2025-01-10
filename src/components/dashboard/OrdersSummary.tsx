import { useEffect, useState } from "react";
import { getOrderStatusTypesCount } from "../../api/services";
import Spinner from "../Spinner";
import { OrderTypes } from "../../interfaces/orders";
import { Link } from "react-router-dom";

function OrdersSummary() {
  const [ordersTypes, setOrdersTypes] = useState<OrderTypes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(function () {
    async function getOrdersSummary() {
      const orderTypesCount = await getOrderStatusTypesCount();
      setOrdersTypes(orderTypesCount as OrderTypes);
      setIsLoading(false);
    }
    getOrdersSummary();
  }, []);

  return (
    <>
      <p className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 mb-6">
        Total <br></br>Orders
      </p>
      {!isLoading ? (
        <>
          <p className="text-center text-5xl font-extrabold text-orange-500 mb-10 animate-pulse">
            {ordersTypes?.totalCount}
          </p>

          <div className="flex items-center">
            <button
              onClick={() => setIsVisible(!isVisible)}
              className={`px-3 transition-all rounded-lg bg-slate-400 text-black py-1 m-auto ${
                isVisible ? "mb-5" : "mb-0"
              }`}
            >
              {!isVisible ? "Show" : "Hide"}
            </button>
          </div>
          <ul
            className={`duration-300 ease-linear ${
              isVisible ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
            }  space-y-6 w-full max-w-md text-lg`}
          >
            <li>
              <Link
                to="/unconfirmed"
                className="cursor-pointer flex flex-wrap justify-between items-center px-4 py-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg shadow-md hover:scale-105 transform transition"
              >
                <p className="text-gray-200 font-medium">Unconfirmed:</p>
                <span className="text-white font-semibold text-ellipsis text-wrap overflow-x-hidden">
                  {ordersTypes?.unconfirmed}
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/shipping"
                className="cursor-pointer flex flex-wrap justify-between items-center px-4 py-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow-md hover:scale-105 transform transition"
              >
                <p className="text-gray-200 font-medium">Shipping:</p>
                <span className="text-white font-semibold text-ellipsis text-wrap overflow-x-hidden">
                  {ordersTypes?.shipping}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/delivered"
                className="cursor-pointer flex flex-wrap justify-between items-center px-4 py-3 bg-gradient-to-r from-green-500 to-lime-500 rounded-lg shadow-md hover:scale-105 transform transition"
              >
                <p className="text-gray-200 font-medium">Delivered:</p>
                <span className="text-white font-semibold text-ellipsis text-wrap overflow-x-hidden">
                  {ordersTypes?.delivered}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/rejected"
                className="cursor-pointer flex flex-wrap justify-between items-center px-4 py-3 bg-gradient-to-r from-red-400 to-red-800 rounded-lg shadow-md hover:scale-105 transform transition"
              >
                <p className="text-gray-200 font-medium">Rejected:</p>
                <span className="text-white font-semibold text-ellipsis text-wrap overflow-x-hidden">
                  {ordersTypes?.rejected}
                </span>
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default OrdersSummary;
