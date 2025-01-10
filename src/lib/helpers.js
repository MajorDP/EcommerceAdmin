export function formatDate(inputDate) {
  const date = new Date(inputDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

  return `${day}.${month}.${year}`;
}

export function calculateOrderTotalPrice(order) {
  const total = order.reduce((acc, curr) => {
    const price =
      curr.discountedPrice !== null ? curr.discountedPrice : curr.productPrice;
    acc += price * curr.quantity + (curr.shippingFee || 0);
    return acc;
  }, 0);

  return total;
}
