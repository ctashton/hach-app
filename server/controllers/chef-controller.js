const express = require(`express`);
const bcrypt = require(`bcrypt`);
const router = express.Router();
// const multer = require('multer')
// const upload = multer({ dest: '../uploads'})
const path = require(`path`);
const clientDir = path.join(__dirname, `../../client`);
const {config} = require('cloudinary')
const { uploader, cloudinaryConfig }=require('../config/cloudinaryConfig') 
const {multerUploads, dataUri} = require('../middleware/multer')
const {User, AuthToken, chefTable} = require("../models");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, `${clientDir}/src/utilities/uploads`)
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname)
//     }
//   })

router.get('/allchefs', async (req, res) => {
    User.findAll({
        where: {
            isChef: true
        }
    })
        .then(chefs => {
            return res.json(chefs)
        })
})

router.post('/upload', multerUploads, (req, res) => {
    console.log(req.file)
    if(req.file) {
     const file = dataUri(req).content;
     return uploader.upload(file).then((result) => {
       const image = result.url;
       return res.status(200).json({
         messge: 'Your image has been uploded successfully to cloudinary',
         data: {
           image
         }
       })
     }).catch((err) => res.status(400).json({
       messge: 'someting went wrong while processing your request',
       data: {
         err
       }
     }))
    }
   });

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