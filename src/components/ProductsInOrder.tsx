import { useState } from "react";
import { IOrder } from "../interfaces/orders";
import { IProductOwner } from "../interfaces/users";
import OrderImgDisplayFull from "./OrderImgDisplayFull";
import OrderedProductInfo from "./OrderedProductInfo";

interface IProductsInOrder {
  order: IOrder;
  productOwner: IProductOwner | null;
}

function ProductsInOrder({ order, productOwner }: IProductsInOrder) {
  const [currentProduct, setCurrentProduct] = useState(0);

  const currentItem = { ...order.items[currentProduct] };

  return (
    <>
      <h2 className="text-center mt-6 py-2 text-xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold">
        Products in order (detailed view)
      </h2>
      <div className="w-full flex flex-col lg:flex-row mt-5 text-lg pb-10">
        <div className="w-[40%] min-h-[10rem] max-h-[20rem] rounded-lg">
          <OrderImgDisplayFull
            order={order}
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
          />
        </div>
        <OrderedProductInfo item={currentItem} productOwner={productOwner} />
      </div>
    </>
  );
}

export default ProductsInOrder;
