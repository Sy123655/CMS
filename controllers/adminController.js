const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const Upload = require('../models/UploadModel').Upload;
const {isEmpty} = require('../config/customFunctions');
const User = require('../models/UserModel').User;

module.exports = {

    index: (req, res) => {
        res.render('admin/index');

    },


    /* ADMIN POSTS ENDPOINTS */


    getPosts: (req, res) => {
        Post.find()
            .populate('category')
            .then(posts => {
                res.render('admin/posts/index', {posts: posts});
            });
    },



    getCreatePostPage: (req, res) => {
        Category.find().then(cats => {

            res.render('admin/posts/create', {categories: cats});
        });


    },

    submitCreatePostPage: (req, res) => {
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            category: req.body.category,
            deadlinefirst: req.body.deadlinefirst,
            deadlinelast: req.body.deadlinelast,
        });

        newPost.save().then(post => {
            req.flash('success-message', 'Post created successfully.');
            res.redirect('/admin/posts');
        });
    },

    getEditPostPage: (req, res) => {
        const id = req.params.id;

        Post.findById(id)
            .then(post => {
                Category.find().then(cats => {
                    res.render('admin/posts/edit', {post: post, categories: cats});
                });
            });
    },

    submitEditPostPage: (req, res) => {
        const id = req.params.id;
        Post.findById(id)
            .then(post => {
                post.title = req.body.title;
                post.status = req.body.status;
                post.description = req.body.description;
                post.category = req.body.category;
                post.deadlinefirst = req.body.deadlinefirst;
                post.deadlinelast = req.body.deadlinelast;

                post.save().then(updatePost => {
                    req.flash('success-message', `The Post ${updatePost.title} has been updated.`);
                    res.redirect('/admin/posts');
                });
            });
    },

    deletePost: (req, res) => {

        Post.findByIdAndDelete(req.params.id)
            .then(deletedPost => {
                req.flash('success-message', `The post ${deletedPost.title} has been deleted.`);
                res.redirect('/admin/posts');
            });
    },

//Manager USer

getUsers: (req, res) => {
    User.find()
        .then(users => {
            res.render('admin/users/index', {users: users});
        });
},

getEditUserPage: (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(user => {
        res.render('admin/users/edit', {user: user});
        }
        );
},

submitEditUserPage: (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(user => {
            user.role = req.body.role;

            user.save().then(updateUser => {
                req.flash('success-message', `The User ${updateUser.role} has been updated.`);
                res.redirect('/admin/users');
            });
        });
},

deleteUser: (req, res) => {

    User.findByIdAndDelete(req.params.id)
        .then(deletedUser => {
            req.flash('success-message', `The post ${deletedUser.email} has been deleted.`);
            res.redirect('/admin/users');
        });
},


    /* ALL CATEGORY METHODS*/
    getCategories: (req, res) => {

        Category.find().then(cats => {
            res.render('admin/category/index', {categories: cats});
        });
    },

    createCategories: (req, res) => {
        let categoryName = req.body.name;

        if (categoryName) {
            const newCategory = new Category({
                title: categoryName
            });

            newCategory.save().then(category => {
                res.status(200).json(category);
            });
        }

    },

    getEditCategoriesPage: async (req, res) => {
        const catId = req.params.id;

        const cats = await Category.find();


        Category.findById(catId).then(cat => {

            res.render('admin/category/edit', {category: cat, categories: cats});

        });
    },


    submitEditCategoriesPage: (req, res) => {
        const catId = req.params.id;
        const newTitle = req.body.name;

        if (newTitle) {
            Category.findById(catId).then(category => {

                category.title = newTitle;

                category.save().then(updated => {
                    res.status(200).json({url: '/admin/category'});
                });

            });
        }
    },

    /* upload ROUTE SECTION*/
   

    


    

    

};

