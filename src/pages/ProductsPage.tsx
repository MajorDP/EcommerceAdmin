import { useEffect, useState } from "react";

import EmptyMessage from "../components/EmptyMessage";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

import { getProducts } from "../api/services";
import { IProduct } from "../interfaces/products";

function ProductsPage() {
  const [productsData, setProductsData] = useState<{
    data: IProduct[];
    count: number;
  }>({ data: [], count: 0 });

  const [filters, setFilters] = useState<{
    dateFrom: number;
    sortValue: string | null;
    searchValue: string | null;
  }>({
    dateFrom: 0,
    sortValue: null,
    searchValue: null,
  });

  const [page, setPage] = useState(0);
  const perPage = 5;
  const pageCount = Math.ceil(productsData.count / perPage);

  const [isLoading, setIsLoading] = useState(true);

  const startIndex = page * perPage;
  const endIndex = startIndex + perPage - 1;

  useEffect(
    function () {
      async function getOrders(startIndex: number, endIndex: number) {
        setIsLoading(true);
        try {
          const { data, count } = await getProducts(
            startIndex,
            endIndex,
            filters
          );

          //@ts-expect-error count is of correct type
          setProductsData({ data: data, count });
        } catch (error) {
          console.error("Error fetching data:", error);
          setProductsData({ data: [], count: 0 });
        } finally {
          setIsLoading(false);
        }
      }
      getOrders(startIndex, endIndex);
    },
    [startIndex, endIndex, filters]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTimeout(() => {
      setFilters({ ...filters, searchValue: value });
    }, 500);
  };
  return (
    <div className="bg-slate-900 w-full h-screen text-white overflow-y-hidden">
      <div className="w-[80%] h-screen m-auto overflow-y-scroll scrollbar-hide">
        <p
          className={`text-center font-semibold p-1 text-4xl bg-gradient-to-r from-green-400 to-green-400 bg-clip-text text-transparent`}
        >
          Products
        </p>
        <div className="flex flex-row items-center justify-center mt-3">
          <div className="flex flex-col items-center mr-2">
            <p className="mb-1">From the last</p>
            <select
              defaultValue={filters.dateFrom}
              onChange={(e) =>
                setFilters({ ...filters, dateFrom: Number(e.target.value) })
              }
              className={`px-3 rounded-lg text-black py-1 m-auto bg-slate-400 cursor-pointer`}
            >
              <option value={0}>Show all</option>
              <option value={1}>Last Day</option>
              <option value={7}>Last Week</option>
              <option value={30}>Last Month</option>
              <option value={365}>Last Year</option>
            </select>
          </div>
          <div className="flex flex-col items-center mr-2">
            <p className="mb-1">Sort by</p>
            <select
              onChange={(e) =>
                setFilters({ ...filters, sortValue: e.target.value })
              }
              className={`px-3 rounded-lg text-black py-1 m-auto bg-slate-400 cursor-pointer`}
            >
              <option value={""}>Default</option>
              <option value={"priceAsc"}>Price (Lowest-up)</option>
              <option value={"priceDesc"}>Price (Highest-up)</option>
              <option value={"idAsc"}>Product ID (Asc)</option>
              <option value={"idDesc"}>Product ID (Desc)</option>
              <option value={"ratingAsc"}>Rating (Lowest-up)</option>
              <option value={"ratingDesc"}>Rating (Highest-up)</option>
              <option value={"onSaleTrue"}>On sale</option>
              <option value={"onSaleFalse"}>Not on sale</option>
              <option value={"availableQuantityAsc"}>
                Available Quantity (Lowest-up)
              </option>
              <option value={"availableQuantityDesc"}>
                Available Quantity (Highest-up)
              </option>
            </select>
          </div>
          <div className="flex flex-col items-center">
            <p className="mb-1">Search by name</p>
            <input
              className={`px-3 rounded-lg text-black py-1 m-auto bg-slate-300`}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <ul className="text-black font-semibold">
          <li
            className={`flex flex-row items-center justify-between bg-gradient-to-r  mb-4 mt-4 rounded-lg p-1 bg-green-500`}
          >
            <div className="flex flex-row items-center justify-start w-[40%]">
              <p className="w-[130px] flex items-center justify-center">
                Image
              </p>
              <p className="text-ellipsis overflow-hidden whitespace-nowrap ml-2 text-center">
                Name
              </p>
            </div>
            <p className="w-[20%] text-center">Rating</p>
            <p className="w-[20%] text-center">Price</p>
            <p className="w-[20%] text-center">Available Quantity</p>
          </li>
        </ul>
        {!isLoading ? (
          productsData?.data.length > 0 ? (
            <>
              <ul>
                {productsData?.data.map((product: IProduct) => (
                  <Link to={`/products/${product.id}`} key={product.id}>
                    <li
                      className={`shadow-2xl hover:scale-95 cursor-pointer duration-150 flex flex-row items-center justify-between bg-gradient-to-r mb-4 rounded-lg h-[130px] ${
                        product.availableQuantity <= 10
                          ? "bg-red-400"
                          : "bg-green-600"
                      }`}
                    >
                      <div className="flex flex-row items-center justify-start w-[40%] rounded-tl-lg">
                        <img
                          src={product.productImg[0]}
                          alt={product.productName}
                          className="w-[130px] h-[130px] rounded-bl-lg rounded-tl-lg"
                        />
                        <p className="text-ellipsis overflow-hidden whitespace-nowrap ml-2 text-center">
                          {product.productName}
                        </p>
                      </div>
                      <p className="w-[20%] text-center">
                        {product.productRating}
                      </p>
                      <p className="w-[20%] text-center font-medium">
                        {product.productPrice.toFixed(2)} $
                      </p>
                      <p className="w-[20%] text-center font-medium">
                        {product.availableQuantity}
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
                  disabled={productsData?.data.length < perPage}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <EmptyMessage type="Products" />
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
