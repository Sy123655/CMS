
const Upload = require('../models/UploadModel').Upload;
const {isEmpty} = require('../config/customFunctions');


module.exports = {

    index: (req, res) => {
        res.render('coordinator/index');

    },

   
    

};

