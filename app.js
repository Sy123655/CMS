/* Importing Different Modules */

const { globalVariables } = require('./config/configuration');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const { mongoDbUrl, PORT } = require('./config/configuration');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const { selectOption } = require('./config/customFunctions');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const cookieSession = require("cookie-session");
const client = require('socket.io').sockets;



const app = express();


// Configure Mongoose to Connect to MongoDB
mongoose.connect(mongoDbUrl, { useNewUrlParser: true })
    .then(response => {
        console.log("MongoDB Connected Successfully.");
    //     // Connect to Socket.io
    // client.on('connection', function(socket){
    //     let chat = db.collection('chats');

    //     // Create function to send status
    //     sendStatus = function(s){
    //         socket.emit('status', s);
    //     }

    //     // Get chats from mongo collection
    //     chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
    //         if(err){
    //             throw err;
    //         }

    //         // Emit the messages
    //         socket.emit('output', res);
    //     });

    //     // Handle input events
    //     socket.on('input', function(data){
    //         let name = data.name;
    //         let message = data.message;

    //         // Check for name and message
    //         if(name == '' || message == ''){
    //             // Send error status
    //             sendStatus('Please enter a name and message');
    //         } else {
    //             // Insert message
    //             chat.insert({name: name, message: message}, function(){
    //                 client.emit('output', [data]);

    //                 // Send status object
    //                 sendStatus({
    //                     message: 'Message sent',
    //                     clear: true
    //                 });
    //             });
    //         }
    //     });

    //     // Handle clear
    //     socket.on('clear', function(data){
    //         // Remove all chats from collection
    //         chat.remove({}, function(){
    //             // Emit cleared
    //             socket.emit('cleared');
    //         });
    //     });
    // });

    }).catch(err => {
        console.log("Database connection failed.");
    });



/* Configure express*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'publics')));
app.use('/publics', express.static('publics'));
app.use('/public', express.static('public'));

/*  Flash and Session*/
app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

/* Passport Initialize */
app.use(passport.initialize());
app.use(passport.session());

/* Use Global Variables */
app.use(globalVariables);


/* File Upload Middleware*/
app.use(fileUpload());

/* Setup View Engine To Use Handlebars */
app.engine('handlebars', hbs({ defaultLayout: 'default', helpers: { select: selectOption } }));
app.set('view engine', 'handlebars');


/* Method Override Middleware*/
app.use(methodOverride('newMethod'));


//socket.io



/* Routes */
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');
const managerRoutes = require('./routes/managerRoutes');
const coordinatorRoutes = require('./routes/coordinatorRoutes');
const userRoutes = require('./routes/userRoutes');


app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);
app.use('/manager',managerRoutes);
app.use('/coordinator',coordinatorRoutes);
app.use('/user',userRoutes);

app.get('/chat', (req, res)=>{
    res.render('./index')
})


/* Start The Server */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});