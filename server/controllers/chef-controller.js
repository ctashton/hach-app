const express = require(`express`);
const bcrypt = require(`bcrypt`);
const router = express.Router();
// const multer = require('multer')
// const upload = multer({ dest: '../uploads'})
const path = require(`path`);
const clientDir = path.join(__dirname, `../../client`);
const { config } = require('cloudinary')
const { uploader, cloudinaryConfig } = require('../config/cloudinaryConfig')
const { multerUploads, dataUri } = require('../middleware/multer')
const { User, AuthToken, chefTable } = require("../models");

router.get('/chefprofile/:id', async (req, res) => {
    const userid = req.params.id
    User.findOne({
        where: {
            id: userid
        },
        include: [{
            model: chefTable,
            attributes: ['id', 'chefQualifications', 'chefRate', 'UserId', 'chefBio', 'chefProfilePictureURL'],
            required: true,
            raw: true
        }]
    })
    .then( chef => {
        res.send(chef)
    })
})


router.get('/allchefs', async (req, res) => {
    User.findAll({
        where: {
            isChef: true
        },
        include: [{
            model: chefTable,
            attributes: ['id', 'chefQualifications', 'chefRate', 'UserId', 'chefBio', 'chefProfilePictureURL'],
            required: true,
            raw: true
        }]
    })
        .then(chefs => {
            
            console.log(chefs.map(chef => {
                return chef.chefTable
            }))
            res.send(chefs)
        })
})

router.post('/upload/:token', multerUploads, (req, res) => {
    console.log(req.file)
    console.log(req.body)
    const usertoken = req.params.token
    let rate = req.body.chefRate
    switch (rate) {
        case '$':
            rate = 1
            break;
        case '$$':
            rate = 2
            break;
        case '$$$':
            rate = 3
            break;
        case '$$$$':
            rate = 4
            break;
    }
    AuthToken.findOne({
        where: {
            token: usertoken
        },
        attributes: ['UserId']
    }).then(user => {
        console.log("User ID : " + user.UserId)
        const userId = user.UserId
        chefTable.findOne({
            where: {
                UserId: userId
            }
        }).then(chef => {
            if (chef === null) {
                if (req.file) {
                    const file = dataUri(req).content;
                    return uploader.upload(file).then((result) => {
                        const image = result.url;
                        chefTable.create({
                            UserId: userId,
                            chefProfilePictureURL: image,
                            chefQualifications: req.body.chefQualifications,
                            chefBio: req.body.chefBio,
                            chefRate: rate
                        })
                        return res.redirect('/EditProfile')
                    }).catch((err) => res.status(400).json({
                        messge: 'someting went wrong while processing your request',
                        data: {
                            err
                        }
                    }))
                } else if (req.file == undefined) {
                    chefTable.create({
                        UserId: userId,
                        chefQualifications: req.body.chefQualifications,
                        chefBio: req.body.chefBio,
                        chefRate: rate
                    })
                    return res.redirect('/EditProfile')
                }
            } else {
                if (req.file) {
                    const file = dataUri(req).content;
                    return uploader.upload(file).then((result) => {
                        const image = result.url;
                        chefTable.update(
                            {
                            chefProfilePictureURL: image,
                            chefQualifications: req.body.chefQualifications,
                            chefBio: req.body.chefBio,
                            chefRate: rate
                        }, {
                            where: {
                                UserId: userId
                            }
                        })
                        return res.redirect('/EditProfile')
                    }).catch((err) => res.status(400).json({
                        messge: 'someting went wrong while processing your request',
                        data: {
                            err
                        }
                    }))
                } else if (req.file == undefined) {
                    chefTable.update({
                        chefQualifications: req.body.chefQualifications,
                        chefBio: req.body.chefBio,
                        chefRate: rate
                    }, {
                        where : {
                        UserId: userId
                    }})
                    return res.redirect('/EditProfile')
                }
            }
        })
    })

});

router.get('/chefinfo/:id', (req, res) => {
    console.log(req.params.id)
    chefTable.findOne({
        where: {
            UserId: req.params.id
        }
    }).then(chefdata => {
        return res.json(chefdata)
    })
})
// router.post('/editprofile/:token', multer({storage: storage}).single('myprofile'),  async (req, res) => {
//     console.log(req.file)
//     const filePath = `${req.file.destination}/${req.file.filename}`
//     console.log(filePath)


//     const usertoken = req.params.token
//     AuthToken.findOne({
//         where: {
//             token: usertoken
//         },
//         attributes: ['UserId']
//     }).then(res => {
//         chefTable.create({
//             UserId: res.UserId,
//             chefProfilePictureURL: filePath
//         })
//     })
// })
module.exports = router