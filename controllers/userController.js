const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const Upload = require('../models/UploadModel').Upload;
const {isEmpty} = require('../config/customFunctions');


module.exports = {

    index: (req, res) => {
        res.render('user/index');

    },

    getUploads1: (req, res) => {
        const id = req.params.id;
        Upload.findById(id)
            .populate('user')
            .then(uploads => {
                res.render('user/uploads/index', {uploads: uploads});
            })
    },
    getEditComment1Page: (req, res) => {
        const id = req.params.id;
        Upload.findById(id)
            .then(upload => {
            res.render('user/uploads/edit2', {upload: upload});
            }
            );
    },
    
    submitEditComment1Page: (req, res) => {
        const id = req.params.id;
        Upload.findById(id)
            .then(upload => {
                upload.comment2 = req.body.comment2;
    
                upload.save().then(updateUpload => {
                    req.flash('success-message', `The User ${updateUpload.comment2} has been updated.`);
                    res.redirect('/user/upload');
                });
            });
    },  

    

};

