const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const Upload = require('../models/UploadModel').Upload;
const {isEmpty} = require('../config/customFunctions');


module.exports = {

    index: (req, res) => {
        res.render('user/index');

    },

    getUploads: (req, res) => {
        Upload.find()
            .populate('user')
            .then(uploads => {
                res.render('user/uploads/index', {uploads: uploads});
            })
    },
   

    

};

