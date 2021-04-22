const express = require('express');
const router = express.Router();
const coordinatorController = require('../controllers/coordinatorController');
const {isUserAuthenticated} = require("../config/customFunctions");


router.all('/*', isUserAuthenticated, (req, res, next) => {

    
    const user = req.user;
    if(user.role == 2){
        req.app.locals.layout = 'coordinator';
}
    next();
});

/* DEFAULT ADMIN INDEX ROUTE*/

router.route('/')
    .get(coordinatorController.index);

/* Coordinator Get upload ROUTES */

router.route('/upload')
    .get(coordinatorController.getUploads);

router.route('/uploads/edit/:id')
    .get(coordinatorController.getEditUploadPage)
    .put(coordinatorController.submitEditUploadPage);


router.route('/uploads/edit1/:id')
    .get(coordinatorController.getEditCommentPage)
    .put(coordinatorController.submitEditCommentPage);

/*sadasdas*/



module.exports = router;

