import { IOrder, IOrderItem } from "../interfaces/orders";

interface IOrderImgDisplay {
  order: IOrder;
}

function OrderImgDisplayMini({ order }: IOrderImgDisplay) {
  const imgLength =
    order.items.length === 1 ? 1 : order.items.length >= 4 ? 4 : 2;

  return (
    <div
      className={`grid bg-white w-fit rounded-tl-lg rounded-bl-lg ${
        imgLength >= 4 ? "grid-cols-2 grid-rows-2" : "grid-cols-1 grid-rows-1"
      }`}
    >
      {order.items.map((item: IOrderItem, index: number) =>
        (index > 0 && imgLength === 2) || (index > 3 && imgLength === 4) ? (
          ""
        ) : (
          <img
            key={index}
            src={item.productImg[0]}
            alt="Product Image"
            //if we have 1, 2 or 3 products => 1, 2 or 3 images, we only show 1 (otherwise images don't look well on the page)
            //if we have 4 products => 4 images, we split them into a 2x2 grid
            className={`${
              imgLength < 4 ? "w-[130px] h-[130px]" : "w-[65px] h-[65px]"
            } rounded-tl-lg rounded-bl-lg ${
              index % 2 === 1 ? "border-l-0" : ""
            } ${index <= 1 && imgLength > 2 ? "border-b-0" : ""}`}
          />
        )
      )}
    </div>
  );
}

export default OrderImgDisplayMini;
