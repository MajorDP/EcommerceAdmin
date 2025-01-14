/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useEffect, useState } from "react";
import { getLowStockProducts } from "../api/services";
import { Product } from "../interfaces/products";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import EmptyMessage from "../components/EmptyMessage";

function LowStock() {
  const [lowStockProductsData, setLowStockProductsData] = useState<{
    data: Product[];
    count: number;
  } | null>(null);

  const [page, setPage] = useState(0);
  const perPage = 5;
  const pageCount = Math.ceil(lowStockProductsData?.count / perPage);

  const [isLoading, setIsLoading] = useState(true);

  const startIndex = page * perPage;
  const endIndex = startIndex + perPage - 1;

  //paginated requests to make load times faster (In a real world app, there would be lots of products with low quantity)
  useEffect(() => {
    async function getLowStockProductsData(
      startIndex: number,
      endIndex: number
    ) {
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
    }
    getLowStockProductsData(startIndex, endIndex);
  }, [startIndex, endIndex]);

  const sortedByQuantity = lowStockProductsData?.data.sort(
    (a, b) => a.availableQuantity - b.availableQuantity
  );

  return (
    <div className="bg-slate-900 w-full h-screen text-white overflow-y-hidden">
      <div className="w-[80%] h-screen m-auto overflow-y-scroll scrollbar-hide">
        <p className="text-center font-semibold text-4xl p-1 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          Low Stocks
        </p>
        {!isLoading ? (
          sortedByQuantity?.length > 0 ? (
            <>
              <ul className="text-black font-semibold">
                <li className="flex flex-row items-center justify-between bg-gradient-to-r from-red-400 to-red-500 mb-4 mt-4 rounded-lg p-1">
                  <div className="flex flex-row items-center justify-start w-[40%]">
                    <p className="w-[130px] flex items-center justify-center">
                      Image
                    </p>
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap ml-2 text-center">
                      Name
                    </p>
                  </div>
                  <p className="w-[20%] text-center">Stocks left</p>
                  <p className="w-[20%] text-center">Price</p>
                  <p className="w-[20%] text-center">Sale</p>
                </li>
              </ul>
              <ul>
                {sortedByQuantity?.map((product: Product) => (
                  <Link to={`/lowstocks/${product.id}`} key={product.id}>
                    <li className="shadow-2xl hover:scale-95 cursor-pointer duration-150 flex flex-row items-center justify-between bg-gradient-to-r from-red-400 to-red-500 mb-4 rounded-lg h-[130px]">
                      <div className="flex flex-row items-center justify-start w-[40%]">
                        <img
                          src={product.productImg[0]}
                          alt={product.productName}
                          className="w-[130px] h-[130px] rounded-tl-lg rounded-bl-lg"
                        />
                        <p className="text-ellipsis overflow-hidden whitespace-nowrap ml-2 text-center">
                          {product.productName}
                        </p>
                      </div>
                      <p className="w-[20%] text-center">
                        {product.availableQuantity}
                      </p>
                      <p className="w-[20%] text-center font-medium">
                        {product.productPrice.toFixed(2)} $
                      </p>
                      <p className="w-[20%] text-center font-medium">
                        {product.onSale ? "Yes" : "No"}
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
                  disabled={lowStockProductsData?.data.length <= perPage}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <EmptyMessage type="Low stocks" />
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default LowStock;
