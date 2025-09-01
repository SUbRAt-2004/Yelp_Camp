const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        (req, res) => {
            // Redirect to the URL user was trying to access before login, or default
            const redirectUrl = res.locals.returnTo || '/campgrounds';
            delete req.session.returnTo;
            req.flash('success', 'Welcome back!');
            res.redirect(redirectUrl);
        }
    );


router.get('/logout', users.logout)

module.exports = router;