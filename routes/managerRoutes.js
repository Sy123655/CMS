const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
const {isUserAuthenticated} = require("../config/customFunctions");
var zip = require('express-easy-zip');
router.use(zip());


router.all('/*', isUserAuthenticated, (req, res, next) => {

    req.app.locals.layout = 'manager';

    next();
});

/* DEFAULT ADMIN INDEX ROUTE*/

router.route('/')
    .get(managerController.index);

router.route('/zip')
    .get(managerController.getzip);


module.exports = router;

