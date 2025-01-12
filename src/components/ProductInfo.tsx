import { Link } from "react-router-dom";
import { IOrderItem } from "../interfaces/orders";
import { IProductOwner } from "../interfaces/users";
import { formatDate } from "../lib/helpers";

interface IProductInfo {
  item: IOrderItem;
  productOwner: IProductOwner | null;
}
function ProductInfo({ item, productOwner }: IProductInfo) {
  const productPrice =
    item.shippingFee !== null
      ? (item.shippingFee + item.discountedPrice || item.productPrice).toFixed(
          2
        )
      : item.productPrice;
  return (
    <div className="flex flex-row w-[60%] px-6 text-xs lg:text-sm justify-between">
      <div className="flex flex-col mt-4 w-[50%]">
        <p className="truncate">
          <span className="font-semibold">Product Name:</span>{" "}
          {item.productName}
        </p>
        <p className="mt-4 truncate">
          <span className="font-semibold">Available Quantity:</span>{" "}
          {item.availableQuantity}
        </p>
        <p className="mt-4 truncate">
          <span className="font-semibold truncate">Price per unit:</span>{" "}
          {item.discountedPrice !== null ? (
            <>
              <span className="text-gray-400 line-through">
                {item.productPrice} $
              </span>
              <span className="ml-2">{item.discountedPrice} $</span>
            </>
          ) : (
            item.productPrice
          )}
          <p className="mt-4 truncate">
            <span className="font-semibold">Shipping fee:</span>{" "}
            {item.shippingFee.toFixed(2) || "None"}
          </p>
        </p>
        <p className="mt-4 truncate">
          <span className="font-semibold">Total:</span> {productPrice} $
        </p>
        <p className="mt-4 truncate">
          <span className="font-semibold truncate">Categories:</span>{" "}
          {item.productCategories.join(", ")}
        </p>
        <Link
          to={`/products/${item.id}`}
          className="bg-green-500 mt-2 w-fit px-2 py-1 rounded-lg hover:scale-105 duration-300"
        >
          See details
        </Link>
      </div>
      <div className="flex flex-col w-[45%]">
        <p className="mt-4 truncate">
          <span className="font-semibold">ID:</span> {item?.id}
        </p>
        <p className="mt-4 ">
          <span className="font-semibold">Posted on/Last edited on:</span>{" "}
          {formatDate(item?.created_at)}
        </p>
        {productOwner !== null ? (
          <>
            <p className="mt-4 truncate">
              <span className="font-semibold">Posted by: </span>
              {productOwner.username}
            </p>
            <p className="mt-4 truncate">
              <span className="font-semibold">Email: </span>
              {productOwner.email}
            </p>
          </>
        ) : (
          <>
            <span className="font-semibold truncate">Posted by: Ecomms</span>
            <span className="font-semibold truncate">
              Email: Ecomms@gmail.com
            </span>
          </>
        )}
        <p className="mt-4 ">
          <span className="font-semibold">Prod. description:</span>{" "}
          <textarea
            readOnly
            value={item.productDesc}
            className="text-black w-full h-full"
          />
        </p>
      </div>
    </div>
  );
}

export default ProductInfo;
