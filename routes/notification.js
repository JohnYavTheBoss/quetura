const {Router} = require('express');
const { sendNotification, getNotifications } = require('../controllers/notification');

const router = Router();

router.post('/notification/send', sendNotification);
router.get('/notification/get/', getNotifications);

module.exports = router;