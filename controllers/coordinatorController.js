const Upload = require('../models/UploadModel').Upload;
const {isEmpty} = require('../config/customFunctions');




module.exports = {

    index: (req, res) => {
        
        res.render('coordinator/index');

    },

    getEditUploadPage: (req, res) => {
        const id = req.params.id;
        Upload.findById(id)
            .then(upload => {
            res.render('coordinator/uploads/edit', {upload: upload});
            }
            );
    },
    
    submitEditUploadPage: (req, res) => {
        const id = req.params.id;
        Upload.findById(id)
            .then(upload => {
                upload.mark = req.body.mark;
    
                upload.save().then(updateUpload => {
                    req.flash('success-message', `The Mark ${updateUpload.mark} has been updated.`);
                    res.redirect('/coordinator/upload');
                });
            });
    },  

    getEditCommentPage: (req, res) => {
        const id = req.params.id;
        Upload.findById(id)
            .then(upload => {
            res.render('coordinator/uploads/edit1', {upload: upload});
            }
            );
    },
    
    submitEditCommentPage: (req, res) => {
        const id = req.params.id;
        Upload.findById(id)
            .then(upload => {
                upload.comment1 = req.body.comment1;
    
                upload.save().then(updateUpload => {
                    req.flash('success-message', `The User ${updateUpload.comment1} has been updated.`);
                    res.redirect('/coordinator/upload');
                });
            });
    },  
    

    /* upload ROUTE SECTION*/
   
    getUploads: (req, res) => {
        Upload.find()
            .populate('user')
            .then(uploads => {
                res.render('coordinator/uploads/index', {uploads: uploads});
            })
    },
   


};

