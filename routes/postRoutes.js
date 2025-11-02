const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { ensureAuthenticated } = require('../middleware/auth');
const upload = require('../config/multer');

router.get('/create', ensureAuthenticated, postController.getCreatePost);
router.post('/create', ensureAuthenticated, upload.single('postImage'), postController.postCreatePost);

router.get('/:id/edit', ensureAuthenticated, postController.getEditPost);
router.post('/:id/edit', ensureAuthenticated, upload.single('postImage'), postController.postEditPost);

router.post('/:id/delete', ensureAuthenticated, postController.deletePost);

router.post('/:id/like', ensureAuthenticated, postController.likePost);

router.post('/:id/comment', ensureAuthenticated, postController.postComment);

module.exports = router;
