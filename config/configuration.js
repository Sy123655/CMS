module.exports = {
    mongoDbUrl : 'mongodb+srv://sycap:'+ encodeURIComponent('sycap12345') + '@test-cluster1.lcqaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    PORT: process.env.PORT || 3000,
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');
        res.locals.user = req.user || null;
        next();
    },


};
