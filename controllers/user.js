const express = require('express');
const router  = express.Router();

const Users = require('../models/user')



router.get('/', (req,res) => {
  Users.find({}, (err, allUsers) => {
          res.render('user/index.ejs', {
              users: allUsers})        
      });
  
})

router.get('/new', (req,res) =>{
    res.render('user/new.ejs')
})

router.post('/', (req,res) => {
    Users.create(req.body, (err,createdUser) => {
        res.redirect('/user')
    })
})





module.exports = router;
