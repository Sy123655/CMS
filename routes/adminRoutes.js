const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {isUserAuthenticated} = require("../config/customFunctions");


router.all('/*', isUserAuthenticated, (req, res, next) => {
const user = req.user;
if(user.role== 0){
    req.app.locals.layout = 'admin';
}
    next();
});

/* DEFAULT ADMIN INDEX ROUTE*/

router.route('/')
    .get(adminController.index);


/* VARIOUS ADMIN POST ENDPOINTS */

router.route('/posts')
    .get(adminController.getPosts);

    router.route('/users')
    .get(adminController.getUsers);

router.route('/posts/create')
    .get(adminController.getCreatePostPage)
    .post(adminController.submitCreatePostPage);


router.route('/posts/edit/:id')
    .get(adminController.getEditPostPage)
    .put(adminController.submitEditPostPage);


router.route('/users/edit/:id')
    .get(adminController.getEditUserPage)
    .put(adminController.submitEditUserPage);

router.route('/users/delete/:id')
    .delete(adminController.deleteUser);


router.route('/posts/delete/:id')
    .delete(adminController.deletePost);


/* ADMIN CATEGORY ROUTES*/

router.route('/category')
    .get(adminController.getCategories);


router.route('/category/create')
    .post(adminController.createCategories);


router.route('/category/edit/:id')
    .get(adminController.getEditCategoriesPage)
    .post(adminController.submitEditCategoriesPage);








module.exports = router;

