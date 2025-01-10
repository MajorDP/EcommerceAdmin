export interface Product {
  id: number;
  created_at: string;
  productName: string;
  productPrice: number;
  productRating: number;
  soldBy: string | null;
  productDesc: string;
  onSale: boolean;
  productCategories: string[];
  productImg: string[];
  listedBy: string;
  options: ProductOption[];
  shippingFee: number | null;
  availableQuantity: number;
  discountedPrice: number | null;
}

export interface ProductOption {
  type: string;
  index: number;
  img: string;
}
