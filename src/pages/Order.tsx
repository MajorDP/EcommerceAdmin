import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Map from "../components/Map";
import Spinner from "../components/Spinner";

import { IOrder } from "../interfaces/orders";
import { IProductOwner } from "../interfaces/users";
import { getOrderById, getProductOwner } from "../api/services";
import ProductsInOrder from "../components/ProductsInOrder";
import ClientOrderDetails from "../components/ClientOrderDetails";
import OrderOverview from "../components/OrderOverview";

function Order() {
  const { id } = useParams();

  const [order, setOrder] = useState<IOrder | null>(null);
  const [productOwner, setProductOwner] = useState<IProductOwner | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getOrder() {
      const order: IOrder = await getOrderById(id);
      if (order.orderedBy !== null) {
        const owner = await getProductOwner(order.orderedBy);
        setProductOwner(owner as IProductOwner);
      }
      setOrder(order as IOrder);
      setIsLoading(false);
    }
    getOrder();
  }, [id]);

  return (
    <div className="bg-slate-900 w-full h-screen text-white flex items-center justify-center">
      <div className="bg-slate-700 w-[80%] h-[80%] rounded-lg p-4 overflow-y-auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="text-center font-semibold text-4xl p-1 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Order: #{order?.id}
            </h1>
            {order !== null ? (
              <>
                <OrderOverview
                  order={order}
                  productOwner={productOwner}
                  id={id as string}
                />
                <ClientOrderDetails order={order} />
                <Map mapLocation={order?.mapLocation[0]} showHeader={true} />
                <ProductsInOrder order={order} productOwner={productOwner} />
              </>
            ) : (
              <p className="text-red-500 font-semibold w-[50%] text-center m-auto flex items-center justify-center">
                There was an error loading order details.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Order;
