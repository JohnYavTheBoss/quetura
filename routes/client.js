const { Router } = require('express');
const { getClient } = require('../controllers/client');

const router = Router();

router.get('/client/getAllclient');
router.get('/client/get/:id', getClient);


module.exports = router;