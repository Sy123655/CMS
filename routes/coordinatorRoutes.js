const express = require('express');
const router = express.Router();
const coordinatorController = require('../controllers/coordinatorController');



router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'coordinator';

    next();
});

/* DEFAULT ADMIN INDEX ROUTE*/

router.route('/')
    .get(coordinatorController.index);

/* Coordinator Get upload ROUTES */

router.route('/upload')
    .get(coordinatorController.getUploads);


/*sadasdas*/


    
router.route('/upload/:id')
    .get(coordinatorController.getSingleUpload);

module.exports = router;

