const express= require('express');
const cors=require('cors');
const bcrypt = require('bcrypt-nodejs');  
const knex=require('knex');
const db  = knex({
  client: 'pg',
  connection:{ connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }}
 
});

const app= express();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());




const register = require('./controllers/register');
const signin = require('./controllers/signin');

const image = require('./controllers/image');

app.get('/',(req,res)=>{
res.send('goooooood');

})

app.post('/signin', signin.handleSignin(db, bcrypt)
 
)

app.post('/register',(req,res)=>{
  register.handleRegister(req, res, db, bcrypt)
    })

    app.get('/profile/:id', (req, res) => {
      const { id } = req.params;
      knex.select('*').from('users').where({id})
        .then(user => {
          if (user.length) {
            res.json(user[0])
          } else {
            res.status(400).json('Not found')
          }
        })
        .catch(err => res.status(400).json('error getting user'))
    })


    app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
    app.put('/image',(req,res)=>{ image.handleImage(req, res, db)})

      



app.listen(process.env.PORT ||3000,()=>{
console.log(`app is runnig on port ${process.env.PORT }`)

})