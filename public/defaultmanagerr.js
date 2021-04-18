const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const Upload = require('../models/UploadModel').Upload;
const bcrypt = require('bcryptjs');
const Manager = require('../models/ManagerModel').Manager;

const { isEmpty } = require('../config/customFunctions');

module.exports = {

    index: async(req, res) => {

        const posts = await Post.find();
        const categories = await Category.find();
        res.render('default/index', { posts: posts, categories: categories });
    },

  
    // /* LOGIN ROUTES */
    loginGetManager: (req, res) => {
        res.render('default/loginmanager', { message: req.flash('error') });
    },


    loginPostManager: (req, res) => {

    },


    /* REGISTER ROUTES*/

    registerGetManager: (req, res) => {
        res.render('default/registermanager');
    },

    registerPostManager: (req, res) => {
        let errors = [];

        if (!req.body.firstName) {
            errors.push({ message: 'First name is mandatory' });
        }
        if (!req.body.lastName) {
            errors.push({ message: 'Last name is mandatory' });
        }
        if (!req.body.email) {
            errors.push({ message: 'Email field is mandatory' });
        }
        if (!req.body.password || !req.body.passwordConfirm) {
            errors.push({ message: 'Password field is mandatory' });
        }
        if (req.body.password !== req.body.passwordConfirm) {
            errors.push({ message: 'Passwords do not match' });
        }

        if (errors.length > 0) {
            res.render('default/registermanager', {
                errors: errors,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
        } else {
            Manager.findOne({ email: req.body.email }).then(manager => {
                if (manager) {
                    req.flash('error-message', 'Email already exists, try to login.');
                    res.redirect('/loginmanager');
                } else {
                    const newManager = new Manager(req.body);

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newManager.password, salt, (err, hash) => {
                            newManager.password = hash;
                            newManager.save().then(manager => {
                                req.flash('success-message', 'You are now registered');
                                res.redirect('/loginmanager');
                            });
                        });
                    });
                }
            });
        }
    },
    


    getSinglePost: (req, res) => {
        const id = req.params.id;

        Post.findById(id)
            .populate({ path: 'uploads', populate: { path: 'user', model: 'user' } })
            .then(post => {
                if (!post) {
                    res.status(404).json({ message: 'No Post Found' });
                } else {
                    res.render('default/singlePost', { post: post, uploads: post.uploads });
                }
            })
    },


    
    //upload file 
    
    submitUpload: (req, res) => {
        if (req.user) {
            Post.findById(req.body.id).then(post => {
                let filename = '';

                if (!isEmpty(req.files)) {
                    let file = req.files.uploadedFile;
                    filename = file.name;
                    let uploadDir = './public/uploads/';

                    file.mv(uploadDir + filename, (err) => {
                        if (err)
                            throw err;
                    });
                }
                const newUpload = new Upload({
                    user: req.user.id,
                    file: `/uploads/${filename}`
                });
                post.uploads.push(newUpload);
                post.save().then(savedPost => {
                    newUpload.save().then(savedUpload => {
                        req.flash('success-message', 'Your file was submitted for review.');
                        res.redirect(`/post/${post._id}`);
                    });
                });


            })
        } else {
            req.flash('error-message', 'Login first to upload');
            res.redirect('/login');
        }

    },
    submitComment: (req, res) => {

        if (req.user) {
            Post.findById(req.body.id).then(post => {
                const newComment = new Comment({
                    user: req.user.id,
                    body: req.body.comment_body
                });

                post.comments.push(newComment);
                post.save().then(savedPost => {
                    newComment.save().then(savedComment => {
                      req.flash('success-message', 'Your comment was submitted for review.');
                      res.redirect(`/post/${post._id}`);
                    });
                });


            })
        }

        else {
            req.flash('error-message', 'Login first to comment');
            res.redirect('/login');
        }

    }

};