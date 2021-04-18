const express = require('express');

const router = express.Router();
const defaultController = require('../controllers/defaultController');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel').User;


router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'default';

    next();
});


// noinspection JSCheckFunctionSignatures
router.route('/')
    .get(defaultController.index);

// Login for Admin
// Defining Local Strategy
passport.use(new LocalStrategy({
    
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }).then(user => {
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
        User.findById(id, function(err, user) {
            done(err, user);
        });
    }),
);


    


    


}));

router.route('/login')
    .get(defaultController.loginGet)
    .post(

    passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: true,
    session: true}),
        defaultController.loginPost);

    







// noinspection JSCheckFunctionSignatures

router.route('/register')
    .get(defaultController.registerGet)
    .post(defaultController.registerPost);

// router.route('/registermanager')
//     .get(defaultController.registerGetManager)
//     .post(defaultController.registerPostManager);

// router.route('/registeradmin')
//     .get(defaultController.registerGetAdmin)
//     .post(defaultController.registerPostAdmin);

//     router.route('/registercoordinator')
//     .get(defaultController.registerGetCoordinator)
//     .post(defaultController.registerPostCoordinator);


router.route('/post/:id')
    .get(defaultController.getSinglePost)
    .post(defaultController.submitUpload);





router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success-message', 'Logout was successful');
    res.redirect('/');
});



module.exports = router;