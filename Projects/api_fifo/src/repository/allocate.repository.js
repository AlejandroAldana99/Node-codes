const Calculate = require('./../helpers/calculate')

function allocateOrders(salesOrders, purchaseOrders) {
    const result = [];
  
    for (const salesOrder of salesOrders) {
      const { created, quantity, id } = salesOrder;
      let availableQuantity = Calculate.calculateAvailableQuantity(created, purchaseOrders);
  
      if (availableQuantity >= quantity) {
        result.push({ id, date: created });
        continue;
      }
  
      for (const order of purchaseOrders) {
        if (order.receiving > created) {
          availableQuantity += order.quantity;
          if (availableQuantity >= quantity) {
            result.push({ id, date: order.receiving });
            break;
          }
        }
      }
    }
  
    return result;
  }

  module.exports = {
    allocateOrders
};

