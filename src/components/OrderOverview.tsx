import { Link } from "react-router-dom";
import { IOrder } from "../interfaces/orders";
import { IProductOwner } from "../interfaces/users";
import {
  calculateOrderItemsCount,
  calculateOrderTotalPrice,
  formatDate,
} from "../lib/helpers";
import OrderImgDisplayFull from "./OrderImgDisplayFull";

interface IOrderOverview {
  order: IOrder;
  productOwner: IProductOwner | null;
  id: string;
}
function OrderOverview({ order, productOwner, id }: IOrderOverview) {
  return (
    <>
      <h2 className="text-center mt-6 py-2 text-xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold">
        Quick overview
      </h2>
      <div>
        <div className="w-full flex flex-col lg:flex-row mt-5 text-lg">
          <div className="w-[50%] min-h-[10rem] max-h-[20rem] rounded-lg">
            <OrderImgDisplayFull order={order} />
          </div>
          <div className="flex flex-col w-[60%] px-6 justify-between">
            <div>
              <div className="flex flex-row justify-between">
                <p className="mt-4">
                  <span className="font-semibold">ID:</span> {order?.id}
                </p>
                <p className="mt-4">
                  <span className="font-semibold">
                    Posted on/Last edited on:
                  </span>{" "}
                  {formatDate(order?.created_at)}
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
                  <span className="font-semibold">Products count:</span>{" "}
                  {calculateOrderItemsCount(order.items)}
                </p>
                <p>
                  <span className="font-semibold">Total:</span>{" "}
                  {calculateOrderTotalPrice(order?.items).toFixed(2)} $
                </p>
              </div>
              <div className="flex flex-row justify-between w-full mt-4">
                <p>
                  <span className="font-semibold">Order status:</span>{" "}
                  {order?.status}
                </p>
                <p className="hover:scale-105 duration-300">
                  <Link
                    to={`/orders/edit/${id}`}
                    className="bg-green-500 px-4 py-1 shadow-lg rounded-lg text-sm"
                  >
                    Change order status
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderOverview;
