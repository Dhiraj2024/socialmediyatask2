const User = require('../models/User');
const Post = require('../models/Post');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('followers', 'username profilePhoto')
      .populate('following', 'username profilePhoto');

    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/feed');
    }

    const posts = await Post.find({ author: user._id })
      .populate('author', 'username profilePhoto')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username profilePhoto' }
      })
      .sort({ createdAt: -1 });

    const isOwnProfile = req.user && req.user._id.toString() === user._id.toString();
    const isFollowing = req.user && user.followers.some(
      follower => follower._id.toString() === req.user._id.toString()
    );

    res.render('user/profile', { 
      user, 
      posts, 
      isOwnProfile, 
      isFollowing 
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error loading profile');
    res.redirect('/feed');
  }
};

exports.getEditProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.render('user/edit-profile', { user });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error loading edit profile page');
    res.redirect('/feed');
  }
};

exports.postEditProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;
    const updateData = { username, bio };

    if (req.file) {
      updateData.profilePhoto = '/uploads/profiles/' + req.file.filename;
    }

    await User.findByIdAndUpdate(req.user._id, updateData);

    req.flash('success', 'Profile updated successfully');
    res.redirect('/user/' + req.user._id);
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error updating profile');
    res.redirect('/user/edit');
  }
};

exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (userToFollow._id.toString() === currentUser._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot follow yourself' });
    }

    const isFollowing = currentUser.following.includes(userToFollow._id);

    if (isFollowing) {
      currentUser.following.pull(userToFollow._id);
      userToFollow.followers.pull(currentUser._id);
    } else {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
    }

    await currentUser.save();
    await userToFollow.save();

    res.json({ 
      success: true, 
      isFollowing: !isFollowing,
      followersCount: userToFollow.followers.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
