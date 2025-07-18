const { Router } = require('express');
const { getCaissier } = require('../controllers/caissier');

const router = Router();

router.get('/caissier/getAllcaissier');
router.get('/caissier/get/:id', getCaissier);



module.exports = router;