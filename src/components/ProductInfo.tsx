import { IProduct } from "../interfaces/products";
import { IProductOwner } from "../interfaces/users";
import { formatDate } from "../lib/helpers";

interface IProductInfo {
  product: IProduct | null;
  productOwner: IProductOwner | null;
  children?: React.ReactNode;
}
function ProductInfo({ product, productOwner, children }: IProductInfo) {
  return (
    <div className="w-full h-fit flex flex-col lg:flex-row mt-5 text-lg pb-10">
      <div className="w-[40%] min-h-[10rem] max-h-[20rem] rounded-lg">
        <img
          src={product?.productImg[0]}
          alt={product?.productName}
          className="rounded-lg border border-black object-contain h-fit m-auto w-fit"
        />
      </div>
      <div className="text-xs md:text-sm flex flex-col w-[60%] px-6 justify-between h-full">
        <div>
          <div className="flex flex-col lg:flex-row justify-between">
            <p className="mt-4">
              <span className="font-semibold">ID:</span> {product?.id}
            </p>
            <p className="mt-4">
              <span className="font-semibold">Posted on/Last edited on:</span>{" "}
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
              <span className="font-semibold">Price per unit:</span>{" "}
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
            <p
              className={`whitespace-nowrap ${
                Number(product?.availableQuantity) <= 10 ? "text-red-500" : ""
              } overflow-hidden text-ellipsis mt-4`}
            >
              <span className="font-semibold">Remaining:</span>{" "}
              <span> {product?.availableQuantity}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-4">{children}</div>
      </div>
    </div>
  );
}

export default ProductInfo;
