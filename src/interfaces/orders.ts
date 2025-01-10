export interface IOrder {
  id: number;
  created_at: string;
  orderedBy: string;
  items: IOrderItem[];
  orderDetails: IOrderDetail[];
  mapLocation: Array<{
    lat: string;
    lng: string;
  }>;
  status: string;
}

export interface IOrderItem {
  id: number;
  created_at: string; // ISO string format
  productName: string;
  productPrice: number;
  productRating: number;
  soldBy: number;
  productDesc: string;
  onSale: boolean;
  productCategories: string[];
  productImg: string[];
  listedBy: string | null;
  options: {
    type: string;
    img: string;
  };
  shippingFee: number;
  availableQuantity: number;
  discountedPrice: number;
  quantity: number;
}

export interface IOrderDetail {
  fullName: string;
  email: string;
  physicalAddress: string;
  postalCode: string;
  phone: string;
  wayOfPayment: string;
}

export interface OrderTypes {
  unconfirmed: number;
  delivered: number;
  shipping: number;
  rejected: number;
  totalCount: number;
}
