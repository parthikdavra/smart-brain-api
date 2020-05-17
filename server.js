var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'parthik',
        database: 'smart_brain'
    }
});

var app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {res.send(db.users)})

app.post('/signin', (req, res) => {signin.signInHandler(req,res,db,bcrypt)});

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id', (req, res) => {profile.profileHandler(req,res,db)});

app.put('/image', (req, res) => {image.imageHandler(req,res,db)});

app.post('/imageUrl', (req, res) => {image.handleApiCall(req,res)}) ;

app.listen(3001, () => {
    console.log("We are runing on server 3001");
})