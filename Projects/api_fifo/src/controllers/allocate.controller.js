const AllocateRepository = require('./../../src/repository/allocate.repository')

function allocateController (req, res, next) {
    console.info("New request to allocate values");
    const salesOrders    = req.body.salesOrders;
    const purchaseOrders = req.body.purchaseOrders;
  
    if (!salesOrders || !purchaseOrders) {
        console.info("Arrays must be provided");
        return res.status(400).json({ error: 'Both salesOrders and purchaseOrders must be provided.' });
    }
  
    const allocatedOrders = AllocateRepository.allocateOrders(salesOrders, purchaseOrders);
    console.info("Process successfully");
    res.json(allocatedOrders);
}

module.exports = {
    allocateController
};