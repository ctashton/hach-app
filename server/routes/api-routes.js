const db = require("../models");
const bcrypt = require(`bcrypt`);
const { User } = require("../models");
const axios = require('axios')


module.exports = function(app) {
    app.get('/api/greeting', (req, res) => {
        const name = req.query.name || 'World';
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
      });


      //gets directions from Google Directions API. Doing it here to hide API key 
      function removeTags(string) {
        return string.replace(/<[^>]*>/g, " ")
    }
    
    const getDirections = (origin, destination) => {
        let apiKey = "AIzaSyArYUj_aKKGPm5FDl1dAf_CN_Ni62nkAMM"
          try {
            return axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`).then(
                response => {
                    let steps = response.data.routes[0].legs[0].steps
                    let instructions = [] 
                    for (let i = 0; i < steps.length; i++){
    
                        instructions.push(removeTags(steps[i].html_instructions))
                    }
                    console.log(instructions)
                //^^ Change this console.log to a return statement
    
                }
            ) 
          } catch (error) {
            console.log(error)
          }
      }
      






































      // app.post('/register', (req, res) => {
      //   // const { email, username, password } = req.body;
      //   console.log(req.body)
      //   const email = req.body.email
      //   const username = req.body.username
      //   const password = req.body.password
      //   // const saltRounds = 10;
      //   // bcrypt.hash(password, saltRounds, function (err, hash) {
      //     db.User.create({
      //       email: email,
      //       username: username,
      //       password: password
      //     }).then((result) => {
      //       console.log("User created: ", result);
      //       res.json("user created!");
      //     })
      //   // });
      // });


        // app.post('/register', async(req, res) => {
        // // hash the password provided by user with bcrypt
        // const hash = bcrypt.hashSync(req.body.password, 10);
        // const saltRounds = 10;
        // try {
        //     // create a new user with password hash from bcrypt
        //     let user = await User.create(
        //         Object.assign(req.body, { password: hash })
        //     );
        //     // data will be an object with the user and its authToken
        //     let data = await user.authorize();
            
        //     // send back the new user and auth token to the client {user, authToken}
        //     return res.json(data);
    
        // } catch(err) {
        //     return res.status(400).send(err);
        // }

        //   })
}