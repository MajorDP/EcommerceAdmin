import { useEffect, useState } from "react";
import { getLowStockProducts } from "../../api/services";
import { Product } from "../../interfaces/products";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

function LowStockAlerts() {
  const [lowStockProductsData, setLowStockProductsData] = useState<{
    data: Product[];
    count: number;
  } | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  const [page, setPage] = useState(0);
  const perPage = 4;
  const pageCount = Math.ceil(lowStockProductsData?.count / perPage);

  const [isLoading, setIsLoading] = useState(true);

  const startIndex = page * perPage;
  const endIndex = startIndex + perPage - 1;

  useEffect(() => {
    const getLowStockProductsData = async (
      startIndex: number,
      endIndex: number
    ) => {
      setIsLoading(true);
      try {
        const { data, count } = await getLowStockProducts(startIndex, endIndex);
        setLowStockProductsData({ data: data as Product[], count });
      } catch (error) {
        console.error("Error fetching data:", error);
        setLowStockProductsData({ data: [], count: 0 });
      } finally {
        setIsLoading(false);
      }
    };
    getLowStockProductsData(startIndex, endIndex);
  }, [startIndex, endIndex]);

  return (
    <>
      <p className="text-center text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text bg-transparent text-transparent">
        Low stock alerts
      </p>
      {!isLoading ? (
        lowStockProductsData?.count > 0 ? (
          <>
            <p className="text-center font-bold text-red-500 text-5xl animate-pulse mb-10">
              {lowStockProductsData?.count}
            </p>

            <div className="flex items-center">
              <button
                onClick={() => setIsVisible(!isVisible)}
                className={`px-3 rounded-lg transition-all bg-slate-400 text-black py-1 m-auto ${
                  isVisible ? "mb-5" : "mb-0"
                }`}
              >
                {!isVisible ? "Show" : "Hide"}
              </button>
            </div>
            <div
              className={`duration-300 ease-linear ${
                isVisible ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
              }`}
            >
              <ul
                className={`duration-300 ease-linear space-y-6 w-full max-w-md text-lg`}
              >
                {lowStockProductsData?.data.map(
                  (product: Product, index: number) => (
                    <li
                      key={index}
                      className="pr-4 pl-3 py-2 bg-gradient-to-r from-red-400 to-red-500 rounded-lg w-full hover:scale-105 transform transition font-medium"
                    >
                      <div className="flex flex-row justify-between">
                        <img
                          src={product.productImg[0]}
                          className="w-[50px] h-[50px] rounded-lg border border-slate-600"
                        />
                        <div className="flex items-center w-[40%]">
                          <p className="mx-1 text-xs overflow-hidden whitespace-nowrap text-ellipsis">
                            {product.productName}
                          </p>
                        </div>
                        <div className="flex justify-between min-w-[40%]">
                          <div className="text-xs flex flex-col">
                            <p>Remaining</p>
                            <p className="text-center">
                              {product.availableQuantity}
                            </p>
                          </div>
                          <Link
                            to={`/lowstocks/${product.id}`}
                            className="flex items-center"
                          >
                            <p>{">"}</p>
                          </Link>
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
              <div
                className={`w-full flex justify-between items-center duration-300 transition-all mt-3`}
              >
                <button
                  onClick={() => setPage((page) => page - 1)}
                  disabled={page === 0}
                  className="bg-slate-300 text-black px-2 rounded enabled:hover:bg-red-300 text-center focus:outline-none disabled:opacity-50 duration-200 ease-in-out"
                  aria-label="Previous"
                >
                  {"<"}
                </button>
                <div className="flex flex-col items-center">
                  <p className="text-gray-400 text-sm">
                    Page {page + 1} of {pageCount}
                  </p>
                  <Link to="/lowstocks">Show table</Link>
                </div>
                <button
                  onClick={() => setPage((page) => page + 1)}
                  disabled={page >= pageCount - 1}
                  className="bg-slate-300 text-black px-2 rounded enabled:hover:bg-red-300 text-center focus:outline-none disabled:opacity-50 duration-200 ease-in-out"
                  aria-label="Next"
                >
                  {">"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center font-bold text-red-500 text-5xl animate-pulse mb-10">
            0
          </p>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default LowStockAlerts;
