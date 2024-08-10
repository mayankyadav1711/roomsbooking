const express = require('express');
const { addRoom, getRooms, updateRoomAvailability } = require('../controllers/roomController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, admin, addRoom).get(getRooms);
router.route('/:roomId/availability').put(protect, admin, updateRoomAvailability);

module.exports = router;