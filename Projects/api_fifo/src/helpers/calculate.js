function calculateAvailableQuantity(date, purchaseOrders) {
    let availableQuantity = 0;
    for (const order of purchaseOrders) {
      if (order.receiving <= date) {
        availableQuantity += order.quantity;
      }
    }
    return availableQuantity;
}

module.exports = {
    calculateAvailableQuantity
}

