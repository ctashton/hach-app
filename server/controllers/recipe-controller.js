const express = require(`express`);
const bcrypt = require(`bcrypt`);
const router = express.Router();
// Grab User model from models folder using "destructuring" syntax
const {User, AuthToken, recipeTable} = require("../models");

// routes will go here

// Register Route =======================================
router.post('/postrecipe', async (req, res) => {

    const usertoken = req.body.token
        AuthToken.findOne({
            where: {
                token: usertoken
            },
            attributes: ['UserId']
        }).then(user => {
            console.log("Found user, inserting into new recipe into database...")
            recipeTable.create({
                recipeName: req.body.recipeName,
                recipeDescription: req.body.recipeDescription,
                recipeAllergens: req.body.recipeAllergens,
                UserId: user.UserId
            }).then(recipedata => {
                console.log(recipedata)
                return res.json(recipedata)
            })
            // return res.json(user)
        });

});

router.get('/myrecipes/:user', async (req, res) => {
    const user = req.params.user
    recipeTable.findAll({
        where: {
            UserId: user
        }
    }).then(recipes => {
        return res.json(recipes)
    })
})

router.get('/allrecipes', async (req, res) => {
    recipeTable.findAll({})
    .then(recipes => {
        return res.json(recipes)
    })
})


// // Login Route =====================================================
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     console.log(req.body)

//     // if the username / password is missing, we use status code 400 indicating a bad req was made
//     if (!username || !password) {
//         return res.status(400).send(
//             'Request missing username or password param'
//         );
//     }

//     try {
//         let user = await User.authenticate(username, password)

//         // user = await user.authorize();
//         console.log(user)
//         return res.json(user);
//     } catch (err) {
//         console.log(err)
//         return res.status(400).send('Invalid username or password')
//     }

// });

// // Logout Route =====================================================
// router.delete('/logout', async (req, res) => {
//     // logout request should have access to the user on the req object, find it and call the logout method
//     const { user, cookies: { auth_token: authToken } } = req
//     // There's no reason req object should not already be present, but check anyway
//     if (user && authToken) {
//         await req.user.logout(authToken);
//         return res.status(204).send();
//     }

//     // If the user is missing, then they're not logged in.  Use status code 400 to indicate a bad request was made
//     return res.status(400).send(
//         { errors: [{ message: 'not authenticated' }] }
//     );
// });

// // Me Route - get currently logged in user
// router.get('/me', (req, res) => {
//     if (req.user) {
//         console.log(req.user)
//         return res.send(req.user)
//     }
//     res.status(404).send(
//         { errors: [{ message: 'missing auth token' }] }
//     );
// });


// export router so we can pass the routes to our server
module.exports = router;