const express = require ("express");
const mysql = require("mysql");
const app = express();
const dotenv = require('dotenv');
const path = require ('path');
const cookieParser = require ('cookie-parser');


dotenv.config({path:'./.env'});

//connects to MySQL, contents hidden in .env
const db = mysql.createConnection({
    host:   process.env.DATABASE_HOST, 
    user:   process.env.DATABASE_USER,
    password:   process.env.DATABASE_PASSWORD,
    database:   process.env.DATABASE
});

//creates public directory in project, all on same plane
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//parse URL encoded bodies sent by HTML forms, second parse JSON bodies sent by API
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//view engine
app.set('view engine', 'hbs');

//db connection error msg
db.connect( (error) => {
    if(error){
        console.log(error);
        }
        else{
            console.log("MySQL Connected...")
        }
    })

//Define routes looking into directory Routes for all pages 
app.use ('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

//server connection success
app.listen(5001, ()=> {
    console.log("Server started on port 5001...")
})

