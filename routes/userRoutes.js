const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middleware/auth');
const upload = require('../config/multer');

router.get('/edit', ensureAuthenticated, userController.getEditProfile);
router.post('/edit', ensureAuthenticated, upload.single('profilePhoto'), userController.postEditProfile);

router.get('/:id', ensureAuthenticated, userController.getProfile);

router.post('/:id/follow', ensureAuthenticated, userController.followUser);

module.exports = router;
