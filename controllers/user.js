const express = require('express');
const router  = express.Router();

const Users = require('../models/user')
const Photos = require('../models/photo')

router.get('/', (req,res) => {
  Users.find({}, (err, allUsers) => {
          res.render('user/index.ejs', {
              users: allUsers})        
      });
  
})

router.get('/new', (req,res) =>{
    res.render('user/new.ejs')
})

router.get('/:id', async (req,res) => {
    try {
   const foundUser = await Users.findById(req.params.id);
        res.render('user/show.ejs', {
            user: foundUser,
       })  
    } catch (err) {
        res.send(err)
    }
    })



router.post('/', (req,res) => {
    Users.create(req.body, (err,createdUser) => {
        res.redirect('/user')
    })
})


router.get('/:id/edit', (req, res)=>{
  Users.findById(req.params.id, (err, foundUser)=>{

    res.render('user/edit.ejs', {
      user: foundUser
    });
  });
});


router.put('/:id', (req, res)=>{
    Users.findOneAndUpdate(req.params.id, req.body, ()=>{
      res.redirect('/user');
    });
  });

  router.delete('/:id', async (req,res) => {

    try {
        const user = await Users.findByIdAndDelete(req.params.id);

        for (let i = 0; i < user.photos.length; i++){
            await Photos.findByIdAndDelete(user.photos[i]._id);
        }

        await Users.findByIdAndDelete(req.params.id);
        res.redirect('/user')
    } catch (err) {
        res.send(err)
    }
                
  })

module.exports = router;
