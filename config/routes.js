const axios = require('axios');
const db = require("../database/dbConfig.js")


const bcrypt = require("bcryptjs");
const { authenticate } = require('../auth/authenticate');
const jwt = require('jsonwebtoken');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

//#region serverendpoints

function register(req, res) {

  let password = bcrypt.hashSync(req.body.password);
  let user = {
    username: req.body.username,
    password: password
  }

   db("users").insert(user)
    .then(() => res.status(200).json({message: "User successfully registered."}))
    .catch(() => res.status(500).json({errormessage: "We had issues registering your user."}))
  // implement user registration
}

function login(req, res) {

  let username = req.body.username;
  let password = req.body.password;

  db("users").where("username", username).then(
    user => {

      if(bcrypt.compareSync(password,user.password)) {
        let token = generateToken(user);

        localStorage.setItem(userToken, token); 

        res.status(201).json({message: `Welcome, ${user.username}!`,
                        userToken: token})
      }
      else {
        res.status(401).json({errorMessage: "Incorrect password entered. Pleae enter a different password"})
      }
    }  
  )
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

//#endregion

function generateToken(user) {
  let payload = {
    username: user.username,
    password: user.password 
  }

  let secretKey = "mySecretKey"; 

  let signOptions = {
    expiresIn: "24h",
    algorithm:  "RS256"
  }; 

  return jwt.sign(payload,secretKey,options);
}
