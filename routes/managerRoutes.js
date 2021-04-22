const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
const User = require('../models/UserModel').User;
var zip = require('express-easy-zip');
router.use(zip());
const {isUserAuthenticated} = require("../config/customFunctions");


router.all('/*', isUserAuthenticated, (req, res, next) => {
    const user = req.user;
    if(user.role == 1){
    req.app.locals.layout = 'manager';
}
    next();
    
});

/* DEFAULT ADMIN INDEX ROUTE*/

router.route('/')
    .get(managerController.index);

router.route('/zip')
    .get(managerController.getzip);

router.route('/upload')
    .get(managerController.getUploads);

module.exports = router;

