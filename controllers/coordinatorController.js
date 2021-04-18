const Upload = require('../models/UploadModel').Upload;
const {isEmpty} = require('../config/customFunctions');
const Comment = require('../models/CommentModel').Comment;

module.exports = {

    index: (req, res) => {
        res.render('coordinator/index');

    },

        /* ALL CATEGORY METHODS*/
        getComments: (req, res) => {

            Comment.find().then(cats => {
                res.render('coordinator/comment/index', {comments: cats});
            });
        },
    
        createComments: (req, res) => {
            let commentName = req.body.name;
    
            if (commentName) {
                const newComment = new Comment({
                    body: commentName
                });
    
                newComment.save().then(comment => {
                    res.status(200).json(comment);
                });
            }
    
        },
    
        getEditCommentsPage: async (req, res) => {
            const catId = req.params.id;
    
            const cats = await Comment.find();
    
    
            Comment.findById(catId).then(cat => {
    
                res.render('coordinator/comment/edit', {comment: cat, comments: cats});
    
            });
        },
    
    
        submitEditCommentsPage: (req, res) => {
            const catId = req.params.id;
            const newBody = req.body.name;
    
            if (newBody) {
                Comment.findById(catId).then(comment => {
    
                    comment.bdy = newBody;
    
                    comment.save().then(updated => {
                        res.status(200).json({url: '/coordinator/comment'});
                    });
    
                });
            }
        },
    

    /* upload ROUTE SECTION*/
   
    getUploads: (req, res) => {
        Upload.find()
            .populate('user')
            .then(uploads => {
                res.render('coordinator/uploads/index', {uploads: uploads});
            })
    },
   
    getSingleUpload: (req, res) => {
        const id = req.params.id;

        Upload.findById(id)
            .populate({ path: 'comment', populate: { path: 'upload', model: 'upload' } })
            .then(post => {
                if (!upload) {
                    res.status(404).json({ message: 'No Upload Found' });
                } else {
                    res.render('coordinator/singleUpload', { upload: upload, comments: upload.comments });
                }
            })
    },

  

    

};

