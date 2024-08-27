const express = require('express');
const router = express.Router();
const { toggleFlow, allocateUserRequests } = require('../controllers/flowController');

// Toggle flow for an astrologer
router.post('/astrologers/:id/toggle-flow', toggleFlow);

// Allocate users to astrologers
router.post('/users/allocate', allocateUserRequests);

module.exports = router;
