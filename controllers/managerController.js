const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const Upload = require('../models/UploadModel').Upload;



module.exports = {

    index: (req, res) => {
        res.render('manager/index');

    },

    getUploads: (req, res) => {
        Upload.find()
            .populate('user')
            .then(uploads => {
                res.render('layouts/manager', {uploads: uploads});
            })
    },
    /* ZIP ALL FILES */
    
    getzip: (req, res, next) => {

        var dirPath = __dirname + "/../public/uploads";
      
        res.zip({
      
             files: [
      
                 {   
                      content: 'This is a test string',      
                     
                      name: 'test-file',
                     
                      mode: 0755,
      
                      comment: 'comment-for-the-file - test file',
      
                      date: new Date(),
      
                      type: 'file' },
                 
      
                 { path: dirPath, name: 'uploads' }    
             ],
             
               filename: 'ZipAllFile.zip'
         
          });
      
      },
    

};

