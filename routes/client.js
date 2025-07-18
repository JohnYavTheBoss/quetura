const { Router } = require('express');
const { getClient, getAllClient } = require('../controllers/client');

const router = Router();

router.get('/client/getAllclient', getAllClient);
router.get('/client/get/:id', getClient);



module.exports = router;