const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const Upload = require('../models/UploadModel').Upload;
const {isEmpty} = require('../config/customFunctions');


module.exports = {

    index: (req, res) => {
        res.render('coordinator/index');

    },


    

    /* upload ROUTE SECTION*/
   
    getUploads: (req, res) => {
        Upload.find()
            .populate('user')
            .then(uploads => {
                res.render('coordinator/uploads/index', {uploads: uploads});
            })
    },
    //Comment route section


    

    

};

