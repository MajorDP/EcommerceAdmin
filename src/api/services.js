import { supabase, supabaseUrl } from "./supabase";

export const getOrderStatusTypesCount = async () => {
  let { data: orders, error } = await supabase.from("orders").select("*");

  if (!error) {
    const orderTypesCount = orders?.reduce(
      (acc, order) => {
        if (order.status === "Unconfirmed") acc.unconfirmed += 1;
        if (order.status === "Shipping") acc.shipping += 1;
        if (order.status === "Rejected") acc.rejected += 1;
        if (order.status === "Delivered") acc.delivered += 1;
        acc.totalCount += 1;

        return acc;
      },
      { unconfirmed: 0, shipping: 0, rejected: 0, delivered: 0, totalCount: 0 }
    );

    return orderTypesCount;
  } else {
    console.log(error.message);
  }
};

export const getTotalRevenue = async (dateFrom) => {
  let { data: deliveredOrders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("status", "Delivered");

  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - dateFrom);

  if (error) {
    console.log("Error fetching orders:", error.message);
    return 0;
  }

  const totalRevenue = deliveredOrders?.reduce((acc, order) => {
    const orderDate = new Date(order.created_at);

    if (orderDate >= startDate && orderDate <= today) {
      const total = order.items.reduce((itemAcc, item) => {
        const price =
          item.discountedPrice !== null
            ? item.discountedPrice
            : item.productPrice;
        return itemAcc + price * item.quantity + (item.shippingFee || 0);
      }, 0);
      return acc + total;
    }
    return acc;
  }, 0);

  return totalRevenue.toFixed(2);
};

//paginated requests to make load times faster (In a real world app, there would be lots of products with low quantity)
export const getLowStockProducts = async (from, to) => {
  let {
    data: lowStockProducts,
    count,
    error,
  } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .lt("availableQuantity", 10)
    .range(from, to);

  if (error) {
    console.log("ERROR FETCHING LOW PRODUCT DATA: ", error.message);
    return [];
  }
  return { data: lowStockProducts, count };
};

export const getProductById = async (id) => {
  let { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log("ERROR GETTING PRODUCT DATA: ", error.message);
    return null;
  }

  return product;
};

export const getProductOwner = async (userId) => {
  let { data: productOwner, error } = await supabase
    .from("userInfoEcoms")
    .select("username, email")
    .eq("userId", userId)
    .single();

  if (error) {
    console.log("ERROR GETTING PRODUCT OWNER DATA: ", error.message);
    return null;
  }

  return productOwner;
};

export const updateQuantity = async (productId, quantity) => {
  const { data, error } = await supabase
    .from("products")
    .update({ availableQuantity: quantity })
    .eq("id", productId)
    .select();

  if (error) {
    return {
      message: `Quantity update for Product #${productId} failed.`,
    };
  } else {
    //if quantity goes above what is considered LOW STOCK, then we redirect to "/", otherwise "/lowstocks/id"
    if (quantity > 10) {
      window.location.href = "/";
    } else {
      window.location.href = `/lowstocks/${productId}`;
    }
  }

  return error;
};

export const removeProduct = async (productId) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    return {
      message: `Removal of Product #${productId} failed.`,
    };
  } else {
    window.location.href = "/lowstocks";
  }
};

export const getDeliveredOrders = async (from, to) => {
  let {
    data: deliveredOrders,
    count,
    error,
  } = await supabase
    .from("orders")
    .select("*", { count: "exact" })
    .eq("status", "Delivered")
    .range(from, to);

  if (error) {
    console.log("ERROR FETCHING DELIVERED ORDERS DATA: ", error.message);
    return [];
  }
  return { data: deliveredOrders, count };
};

export const getRejectedOrders = async (from, to) => {
  let {
    data: rejectedOrders,
    count,
    error,
  } = await supabase
    .from("orders")
    .select("*", { count: "exact" })
    .eq("status", "Rejected")
    .range(from, to);

  if (error) {
    console.log("ERROR FETCHING REJECTED ORDERS DATA: ", error.message);
    return [];
  }
  return { data: rejectedOrders, count };
};

export const getShippingOrders = async (from, to) => {
  let {
    data: shippingOrders,
    count,
    error,
  } = await supabase
    .from("orders")
    .select("*", { count: "exact" })
    .eq("status", "Shipping")
    .range(from, to);

  if (error) {
    console.log("ERROR FETCHING SHIPPING ORDERS DATA: ", error.message);
    return [];
  }
  return { data: shippingOrders, count };
};

export const getUnconfirmedOrders = async (from, to) => {
  let {
    data: unconfirmedOrders,
    count,
    error,
  } = await supabase
    .from("orders")
    .select("*", { count: "exact" })
    .eq("status", "Unconfirmed")
    .range(from, to);

  if (error) {
    console.log("ERROR FETCHING UNCONFIRMED ORDERS DATA: ", error.message);
    return [];
  }
  return { data: unconfirmedOrders, count };
};
