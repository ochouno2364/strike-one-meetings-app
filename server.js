// DEPENDENCIES
const express = require('express'); 
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const ejs = require('ejs');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const MongoStore = require('connect-mongo');

const authCtrl = require('./controllers/auth.js'); //Import auth controller
const meetingCtrl = require('./controllers/meetings.js');

// NEW MIDDLEWARE Imported
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

// CONNECT TO MONGOOSE
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
console.log(`Connected to MongoDB ${mongoose.connection.name}.`); // This will show in the console that i am connected 
});

// MIDDLEWARE 


app.use(express.urlencoded({ extended: false}));

app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
    })
);

app.use(passUserToView);





// ROUTES 

//test route
// app.get('/', (req, res) => {
//     res.send('StrikeOne')
// });

// (I)NDEX ROUTE
app.get('/', (req, res) => {
    res.render('home.ejs', { 
        user: req.session.user,
    });
});



// Other MIDDLE WARE

app.use('/auth', authCtrl);
app.use(isSignedIn);
app.use('/users/:userId/meetings', meetingCtrl);

// PORT LISTENER
app.listen(3500, ()=> {
    console.log('Listening on Port 3500')
});