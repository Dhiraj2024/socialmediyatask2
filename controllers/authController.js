const User = require('../models/User');
const passport = require('passport');

exports.getRegister = (req, res) => {
  res.render('auth/register');
};

exports.postRegister = async (req, res) => {
  try {
    const { username, email, password, password2 } = req.body;

    if (password !== password2) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('/auth/register');
    }

    const existingUser = await User.findOne({ 
      $or: [{ email: email.toLowerCase() }, { username }] 
    });

    if (existingUser) {
      req.flash('error', 'Email or username already exists');
      return res.redirect('/auth/register');
    }

    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password
    });

    await newUser.save();
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred during registration');
    res.redirect('/auth/register');
  }
};

exports.getLogin = (req, res) => {
  res.render('auth/login');
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/feed',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'You have been logged out');
    res.redirect('/auth/login');
  });
};
