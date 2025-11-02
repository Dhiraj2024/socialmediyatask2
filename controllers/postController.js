const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

exports.getFeed = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const followingIds = currentUser.following;
    followingIds.push(currentUser._id);

    const posts = await Post.find({ author: { $in: followingIds } })
      .populate('author', 'username profilePhoto')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username profilePhoto' }
      })
      .sort({ createdAt: -1 });

    res.render('post/feed', { posts });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error loading feed');
    res.redirect('/');
  }
};

exports.getCreatePost = (req, res) => {
  res.render('post/create');
};

exports.postCreatePost = async (req, res) => {
  try {
    const { content } = req.body;
    const postData = {
      content,
      author: req.user._id
    };

    if (req.file) {
      postData.image = '/uploads/posts/' + req.file.filename;
    }

    const newPost = new Post(postData);
    await newPost.save();

    req.flash('success', 'Post created successfully');
    res.redirect('/feed');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error creating post');
    res.redirect('/post/create');
  }
};

exports.getEditPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      req.flash('error', 'Post not found');
      return res.redirect('/feed');
    }

    if (post.author.toString() !== req.user._id.toString()) {
      req.flash('error', 'Unauthorized');
      return res.redirect('/feed');
    }

    res.render('post/edit', { post });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error loading post');
    res.redirect('/feed');
  }
};

exports.postEditPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      req.flash('error', 'Post not found');
      return res.redirect('/feed');
    }

    if (post.author.toString() !== req.user._id.toString()) {
      req.flash('error', 'Unauthorized');
      return res.redirect('/feed');
    }

    post.content = req.body.content;

    if (req.file) {
      post.image = '/uploads/posts/' + req.file.filename;
    }

    await post.save();

    req.flash('success', 'Post updated successfully');
    res.redirect('/feed');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error updating post');
    res.redirect('/feed');
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      req.flash('error', 'Post not found');
      return res.redirect('/feed');
    }

    if (post.author.toString() !== req.user._id.toString()) {
      req.flash('error', 'Unauthorized');
      return res.redirect('/feed');
    }

    await Comment.deleteMany({ post: post._id });
    await Post.findByIdAndDelete(req.params.id);

    req.flash('success', 'Post deleted successfully');
    res.redirect('/feed');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error deleting post');
    res.redirect('/feed');
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const userIndex = post.likes.findIndex(id => id.equals(req.user._id));

    if (userIndex > -1) {
      post.likes.splice(userIndex, 1);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.json({ 
      success: true, 
      liked: userIndex === -1,
      likesCount: post.likes.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.postComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      req.flash('error', 'Post not found');
      return res.redirect('/feed');
    }

    const newComment = new Comment({
      content,
      author: req.user._id,
      post: post._id
    });

    await newComment.save();
    post.comments.push(newComment._id);
    await post.save();

    req.flash('success', 'Comment added');
    res.redirect('/feed');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error adding comment');
    res.redirect('/feed');
  }
};
