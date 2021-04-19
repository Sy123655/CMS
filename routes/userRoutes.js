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

router.route('/upload')
    .get(userController.getUploads1);

    router.route('/uploads/edit2/:id')
    .get(userController.getEditComment1Page)
    .put(userController.submitEditComment1Page);

/* VARIOUS ADMIN POST ENDPOINTS */








module.exports = router;

