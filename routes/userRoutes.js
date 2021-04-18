const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {isUserAuthenticated} = require("../config/customFunctions");


router.all('/*', isUserAuthenticated, (req, res, next) => {

    req.app.locals.layout = 'user';

    next();
});

/* DEFAULT ADMIN INDEX ROUTE*/

router.route('/')
    .get(userController.index);


/* VARIOUS ADMIN POST ENDPOINTS */








module.exports = router;

