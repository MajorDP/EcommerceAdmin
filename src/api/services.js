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

export const getOrders = async (from, to, dateFrom, sortValue) => {
  let query = supabase
    .from("orders")
    .select("*", { count: "exact" })
    .range(from, to);

  if (dateFrom > 0) {
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - dateFrom);
    query = query.gte("created_at", dateLimit.toISOString());
  }

  const sortOptions = {
    idAsc: { column: "id", ascending: true },
    idDesc: { column: "id", ascending: false },
    countAsc: { column: "productsCount", ascending: true },
    countDesc: { column: "productsCount", ascending: false },
    priceAsc: { column: "totalPrice", ascending: true },
    priceDesc: { column: "totalPrice", ascending: false },
  };

  if (sortValue && sortOptions[sortValue]) {
    const { column, ascending } = sortOptions[sortValue];
    query = query.order(column, { ascending });
  }

  const { data: orders, count, error } = await query;

  if (error) {
    console.error("ERROR FETCHING ORDERS DATA:", error.message);
    return [];
  }

  return { data: orders, count };
};

export const getOrdersByStatus = async (status, from, to) => {
  let {
    data: orders,
    count,
    error,
  } = await supabase
    .from("orders")
    .select("*", { count: "exact" })
    .eq("status", status)
    .range(from, to);

  if (error) {
    console.log(`ERROR FETCHING ${status} ORDERS DATA: `, error.message);
    return [];
  }
  return { data: orders, count };
};

export const getOrderById = async (id) => {
  let { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(`ERROR FETCHING ORDER DATA: `, error.message);
    return [];
  }

  return order;
};

export const updateOrderStatus = async (id, updatedStatus, orderedItems) => {
  console.log("Ordered Items:", orderedItems);

  //in case of changing an order to Shipping (if the order is accepted), we first lower the products' available quantity in database that are being purchased
  if (updatedStatus.status === "Shipping") {
    //getting the current available quantities for all ordered items
    const quantityCheckPromises = orderedItems.map(async (item) => {
      const availableQuantity = await getCurrentAvailableQuantity(item.id);
      return {
        ...item,
        currentAvailableQuantity: availableQuantity,
      };
    });

    const updatedOrderedItems = await Promise.all(quantityCheckPromises);

    //checking if any item has insufficient quantity
    const isQuantityNotEnough = updatedOrderedItems.some(
      (item) => item.currentAvailableQuantity - item.quantity < 0
    );

    if (isQuantityNotEnough) {
      return {
        error: {
          message: "Not enough available quantity on one or more products.",
        },
      };
    }

    //uUpdating product quantities in parallel
    const updatePromises = updatedOrderedItems.map(async (item) => {
      const newAvailableQuantity =
        item.currentAvailableQuantity - item.quantity;

      return supabase
        .from("products")
        .update({ availableQuantity: newAvailableQuantity })
        .eq("id", item.id);
    });

    const updateResults = await Promise.all(updatePromises);

    //checking for errors in product updates
    const hasUpdateErrors = updateResults.some((result) => result.error);
    if (hasUpdateErrors) {
      return {
        error: {
          message: "Failed to update product quantities.",
        },
      };
    }
  }

  //updating the order's status
  const { data, error } = await supabase
    .from("orders")
    .update({
      status: updatedStatus.status,
      statusReason: updatedStatus.reason,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { error: { message: "Order status update failed." } };
  } else {
    return {
      error: null,
    };
  }
};

export const getCurrentAvailableQuantity = async (id) => {
  const { data: product, error } = await supabase
    .from("products")
    .select("availableQuantity")
    .eq("id", id)
    .single();

  if (error) {
    console.error(
      `Failed to fetch available quantity for product ID ${id}:`,
      error
    );
    return null;
  }

  return product?.availableQuantity || 0;
};

export const getProducts = async (from, to, filters) => {
  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .range(from, to);

  if (filters.dateFrom !== 0) {
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - filters.dateFrom);
    query = query.gte("created_at", dateLimit.toISOString());
  }

  if (filters.sortValue) {
    const sortOptions = {
      idAsc: { column: "id", ascending: true },
      idDesc: { column: "id", ascending: false },
      priceAsc: { column: "productPrice", ascending: true },
      priceDesc: { column: "productPrice", ascending: false },
      ratingAsc: { column: "productRating", ascending: true },
      ratingDesc: { column: "productRating", ascending: false },
      onSaleFalse: { column: "onSale", ascending: true },
      onSaleTrue: { column: "onSale", ascending: false },
      availableQuantityAsc: { column: "availableQuantity", ascending: true },
      availableQuantityDesc: { column: "availableQuantity", ascending: false },
    };

    const { column, ascending } = sortOptions[filters.sortValue];
    query = query.order(column, { ascending });
  }

  if (filters.searchValue) {
    query = query.ilike("productName", `%${filters.searchValue.trim()}%`);
  }

  const { data: products, count, error } = await query;
  if (error) {
    console.log(`ERROR FETCHING PRODUCTS DATA: `, error.message);
    return { data: [], count: 0 };
  }
  return { data: products, count };
};
