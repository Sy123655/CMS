
const express = require('express');

const router = express.Router();
const defaultmanager = require('../controllers/defaultmanager');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel').User;
const Manager = require('../models/ManagerModel').Manager;


router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'defaultmanager';

    next();
});


// noinspection JSCheckFunctionSignatures
router.route('/')
    .get(defaultmanager.index);

// Login for Admin
// Defining Local Strategy
passport.use(new LocalStrategy({
    
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
    Manager.findOne({ email: email }).then(user => {
        if (!user) {
            return done(null, false, req.flash('error-message', 'User not found with this email.'));
        }

        bcrypt.compare(password, user.password, (err, passwordMatched) => {
            if (err) {
                return err;
            }

            if (!passwordMatched) {
                return done(null, false, req.flash('error-message', 'Invalid Username or Password'));
            }
  
            return done(null, user, req.flash('success-message', 'Login Successful'));
        });

    },
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    }),
    
    passport.deserializeUser(function(id, done) {
        Manager.findById(id, function(err, user) {
            done(err, user);
        });
    }),
);


    


    


}));





router.route('/loginmanager')
.get(defaultmanager.loginGetManager)
.post(
    passport.authenticate('local', {
    successRedirect: '/manager',
    failureRedirect: '/loginmanager',
    failureFlash: true,
    successFlash: true,
    session: true
}), 
defaultmanager.loginPostManager);




router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success-message', 'Logout was successful');
    res.redirect('/');
});



module.exports = router;
    


    

