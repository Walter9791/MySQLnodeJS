const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//connects to MySQL, contents hidden in .env -- this is from app.js-- this is to query from controller

const db = mysql.createConnection({
    host:   process.env.DATABASE_HOST, 
    user:   process.env.DATABASE_USER,
    password:   process.env.DATABASE_PASSWORD,
    database:   process.env.DATABASE
});

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body; 

        if(!email || !password){
            return res.status(400).render('login', {
                message: 'Email not registered, or password incorrect.'
            })
        }

    } catch (error) {
        console.log(error);
    }
}








exports.register = (req, res) =>{
    console.log(req.body);

    //const name = req.body.name;
    //const email = req.body.email;
    //const password = req.body.password;
    //const passwordConfirm = req.body.passwordConfirm;

    //Same exact as above, just restructured, ionstead of all diff constant names 
    const {name, email, password, passwordConfirm} = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result)=>{
        if(error){
            console.log(error);
        }

        if(result.length > 0){
            return res.render('register',{
                message: 'That email is already in use'
            })
        }else if(password !== passwordConfirm){
            return res.render('register',{
                message: 'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (error, results) =>{
            if(error){
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User registered'
                });
            }

        })
         
       

    });

}
