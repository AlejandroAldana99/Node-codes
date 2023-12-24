const express            = require('express');
const router             = express.Router();
const AllocateController = require('./src/controllers/allocate.controller');

router.post('/allocate', AllocateController.allocateController);

module.exports = router;

