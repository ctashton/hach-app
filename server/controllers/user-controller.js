const express = require(`express`);
const bcrypt = require(`bcrypt`);
const router = express.Router();
// Grab User model from models folder using "destructuring" syntax
const { User, AuthToken } = require("../models");

// routes will go here

// Register Route =======================================
router.post('/register', async (req, res) => {
    // hash the password provided by user with bcrypt
    const hash = bcrypt.hashSync(req.body.password, 10);
    try {
        // create a new user with password hash from bcrypt
        let user = await User.create(
            Object.assign(req.body, { password: hash })
        );
        // data will be an object with the user and its authToken
        let data = await user.authorize();
        
        // send back the new user and auth token to the client {user, authToken}
        // console.log(data));
        return res.json(data);

    } catch(err) {
        return res.status(400).send(err);
    }
});


// Login Route =====================================================
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)

    // if the username / password is missing, we use status code 400 indicating a bad req was made
    if (!username || !password) {
        return res.status(400).send(
            'Request missing username or password param'
        );
    }

    try {
        let user = await User.authenticate(username, password)

        // user = await user.authorize();
        console.log(user)
        return res.json(user);
    } catch (err) {
        console.log(err)
        return res.status(400).send('Invalid username or password')
    }

});

// Logout Route =====================================================
router.delete('/logout', async (req, res) => {
    // logout request should have access to the user on the req object, find it and call the logout method
    const { user, cookies: { auth_token: authToken } } = req
    // There's no reason req object should not already be present, but check anyway
    if (user && authToken) {
        await req.user.logout(authToken);
        return res.status(204).send();
    }
    
    // If the user is missing, then they're not logged in.  Use status code 400 to indicate a bad request was made
    return res.status(400).send(
        { errors: [{ message: 'not authenticated' }] }
    );
});

// Me Route - get currently logged in user
router.get('/me/:token', (req, res) => {
    const usertoken = req.params.token
    AuthToken.findOne({
        where: {
            token: usertoken
        },
        attributes: ['UserId']
    }).then(user => {
        User.findOne({
            where: {
                id: user.UserId
            }
        }).then( userdata =>{
            return res.json(userdata)
        })
        })
});


// export router so we can pass the routes to our server
module.exports = router;