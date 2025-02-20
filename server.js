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


const authCtrl = require('./controllers/auth.js'); //Import auth controller

// NEW MIDDLEWARE Imported
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

// CONNECT TO MONGOOSE
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
console.log(`Connected to MongoDB ${mongoose.connection.name}.`); // This will show in the console that i am connected 
});

// MIDDLEWARE 

app.use(passUserToView);
app.use(express.urlencoded({ extended: false}));

app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);






// ROUTES 

//test route
// app.get('/', (req, res) => {
//     res.send('StrikeOne')
// });

// (I)NDEX ROUTE
app.get('/', (req, res) => {
    res.render('home.ejs')
});

// (N)EW ROUTE
app.get('/users/:userId/meetings/:meetingId/new', async (req, res) => {
    res.send('NEW ROUTE')
});

// (D)ELETE ROUTE
app.delete('/users/:userId/meetings/:meetingId', async (req, res) => {
    res.send('DELETE ROUTE')
});

// (U)PDATE ROUTE
app.put('/users/:userId/meetings/:meetingId', async (req, res) => {
    res.send('UPDATE ROUTE')
})


// (C)REATE ROUTE
app.post('/users/:userId/meetings', async (req, res) => {
    
});


// (E)DIT ROUTE
app.get('/users/:userId/meetings/:meetingId/edit', async (req, res) => {
    res.send('EDIT ROUTE')
});

// (S)HOW ROUTE
app.get('/users/:userId/meetings/:meetingId', async (req, res) => {
    res.send('SHOW ROUTE')
});



// Other MIDDLE WARE
app.use('/auth', authCtrl);
app.use(isSignedIn);

// PORT LISTENER
app.listen(3500, ()=> {
    console.log('Listening on Port 3500')
});