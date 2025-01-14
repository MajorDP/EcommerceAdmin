import { useEffect, useState } from "react";
import { getProductById, getProductOwner } from "../api/services";
import { IProduct } from "../interfaces/products";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { IProductOwner } from "../interfaces/users";
import { formatDate } from "../lib/helpers";
import QuantityIncreaseModal from "../components/modals/QuantityIncreaseModal";
import RemoveProductModal from "../components/modals/RemoveProductModal";

function LowStockProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [productOwner, setProductOwner] = useState<IProductOwner | null>(null);
  const [modalState, setModalState] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      const product: IProduct = await getProductById(id);
      if (product.listedBy !== null) {
        const owner = await getProductOwner(product.listedBy);
        setProductOwner(owner as IProductOwner);
      }
      setProduct(product as IProduct);
      setIsLoading(false);
    }
    getProduct();
  }, [id]);

  return (
    <>
      {modalState === "increase" && (
        <QuantityIncreaseModal
          setModalState={setModalState}
          currQuantity={product?.availableQuantity || 0}
          productId={product?.id || 0}
        />
      )}
      {modalState === "remove" && (
        <RemoveProductModal
          setModalState={setModalState}
          productId={product?.id || 0}
        />
      )}
      <div
        className={`${
          modalState !== null && "pointer-events-none opacity-70"
        } bg-slate-900 w-full h-screen text-white overflow-y-hidden flex items-center justify-center`}
      >
        <div className="bg-slate-700 w-[80%] h-fit rounded-lg p-4">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <p className="text-center font-semibold text-4xl p-1 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Low Stock:
              </p>
              <p className=" text-center text-white text-3xl whitespace-nowrap overflow-hidden text-ellipsis p-1">
                {product?.productName}
              </p>
              <div className="w-full flex flex-row mt-5 text-lg">
                <div className="w-[40%] h-full rounded-lg">
                  <img
                    src={product?.productImg[0]}
                    alt={product?.productName}
                    className="w-[25rem] h-fit object-contain rounded-lg"
                  />
                </div>
                <div className="flex flex-col w-[60%] px-6 justify-between h-full">
                  <div>
                    <div className="flex flex-row justify-between">
                      <p className="mt-4">
                        <span className="font-semibold">ID:</span> {product?.id}
                      </p>
                      <p className="mt-4">
                        <span className="font-semibold">
                          Posted on/Last edited on:
                        </span>{" "}
                        {formatDate(product?.created_at)}
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
                        <span className="font-semibold">Price:</span>{" "}
                        {product?.productPrice.toFixed(2)} $
                      </p>
                      <p>
                        <span className="font-semibold">Shipping fee: </span>
                        {product?.shippingFee !== null ? (
                          product?.shippingFee.toFixed(2)
                        ) : (
                          <span className="text-green-500">Free shipping</span>
                        )}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis mt-4">
                        <span className="font-semibold">Categories: </span>
                        <span>
                          {product?.productCategories
                            .map(
                              (category) =>
                                category.charAt(0).toUpperCase() +
                                category.slice(1).toLowerCase()
                            )
                            .join(", ")}
                        </span>{" "}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className="whitespace-nowrap text-red-500 overflow-hidden text-ellipsis mt-4">
                        <span className="font-semibold">Remaining:</span>{" "}
                        <span> {product?.availableQuantity}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <button
                      onClick={() => setModalState("increase")}
                      className="bg-green-500 px-4 py-1 shadow-lg rounded-lg hover:scale-105 duration-300 text-sm"
                    >
                      Mark quantity as increased
                    </button>
                    <button
                      className="bg-red-500 px-4 py-1 shadow-lg rounded-lg hover:scale-105 duration-300 text-sm"
                      onClick={() => setModalState("remove")}
                    >
                      Remove product from store
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default LowStockProduct;
