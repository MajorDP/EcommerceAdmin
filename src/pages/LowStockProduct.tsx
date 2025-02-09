import { useEffect, useState } from "react";
import { getProductById, getProductOwner } from "../api/services";
import { IProduct } from "../interfaces/products";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { IProductOwner } from "../interfaces/users";
import QuantityIncreaseModal from "../components/modals/QuantityIncreaseModal";
import RemoveProductModal from "../components/modals/RemoveProductModal";
import ProductInfo from "../components/ProductInfo";

function LowStockProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [productOwner, setProductOwner] = useState<IProductOwner | null>(null);
  const [modalState, setModalState] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      const product = await getProductById(id);

      if (product) {
        setProduct(product as IProduct);

        if (product.listedBy !== null) {
          const owner = await getProductOwner(product.listedBy);
          setProductOwner(owner as IProductOwner);
        }
      }
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
        <div className="bg-slate-700 w-[80%] h-[85%] rounded-lg p-4">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <p className="text-center font-semibold text-4xl p-1 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Low Stock:
              </p>
              {product !== null ? (
                <>
                  <h2 className="text-center mt-6 py-2 text-xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold">
                    {product.productName}
                  </h2>
                  <ProductInfo product={product} productOwner={productOwner}>
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
                  </ProductInfo>
                </>
              ) : (
                <p className="text-red-500 text-center mt-2 text-lg font-semibold">
                  Product #{id} was not found
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default LowStockProduct;
