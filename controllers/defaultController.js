const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const Upload = require('../models/UploadModel').Upload;
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel').User;
const { isEmpty } = require('../config/customFunctions');
const ADMIN = 0;
const MANAGER = 1;
const COORDINATOR = 2;
const USER = 3;
module.exports = {

    index: async(req, res) => {

        const posts = await Post.find();
        const categories = await Category.find();
        res.render('default/index', { posts: posts, categories: categories });
    },

    /* LOGIN ROUTES */
    loginGet: (req, res) => {
        res.render('default/login', { message: req.flash('error') });
    },


    loginPost: (req, res) => {
        const user = req.user;
        if(user.role == 0){
            res.redirect('/admin')
        }
        if(user.role == 1){
            res.redirect('/manager')
        }
        if(user.role == 2){
            res.redirect('/coordinator')
        }
        if(user.role == 3){
            res.redirect('/user')
        }
    },

    /* REGISTER ROUTES*/

    registerGet: (req, res) => {
        res.render('default/register');
    },

    registerPost: (req, res) => {
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
            res.render('default/register', {
                errors: errors,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
        } else {
            User.findOne({ email: req.body.email }).then(user => {
                if (user) {
                    req.flash('error-message', 'Email already exists, try to login.');
                    res.redirect('/login');
                } else {
                    const newUser = new User(req.body);

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash;
                            newUser.save().then(user => {
                                req.flash('success-message', 'You are now registered');
                                res.redirect('/login');
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
                    const today = new Date().getTime();
                    const deadlineTimeTemp = post.deadlinelast;
                    const deadlineTimeTemp1 = post.deadlinefirst;
                    const deadlineTime = new Date(deadlineTimeTemp).getTime();
                    const deadlineTime1 = new Date(deadlineTimeTemp1).getTime();
                    const isPassDeadline = deadlineTime > today;
                    const isPassDeadline1 = deadlineTime1 > today;
                    res.render('default/singlePost', { post: post, uploads: post.uploads, isPassDeadline: isPassDeadline, isPassDeadline1: isPassDeadline1 });
                }
            })
    },


    
    //upload file 
    
    submitUpload: (req, res) => {
        if (req.user) {
            if(user.role == 3){
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


            })}
        } else {
            req.flash('error-message', 'Just User submit!');
            res.redirect('/');
        }

    },
    

};