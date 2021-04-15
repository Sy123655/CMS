const express = require('express');
const router = express.Router();
const coordinatorController = require('../controllers/coordinatorController');
const {isUserAuthenticated} = require("../config/customFunctions");


router.all('/*', isUserAuthenticated, (req, res, next) => {

    req.app.locals.layout = 'coordinator';

    next();
});

/* DEFAULT ADMIN INDEX ROUTE*/

router.route('/')
    .get(coordinatorController.index);

/* Coordinator Get upload ROUTES */




module.exports = router;

