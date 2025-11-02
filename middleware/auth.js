module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error', 'Please log in to view this resource');
    res.redirect('/auth/login');
  },

  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect('/feed');
    }
    next();
  },

  setCurrentUser: (req, res, next) => {
    res.locals.currentUser = req.user || null;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
  }
};
