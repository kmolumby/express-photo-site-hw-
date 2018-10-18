const express = require('express');
const router  = express.Router();

const Photos = require('../models/photo')
const Users = require('../models/user')


router.get('/', async (req,res) => {
  try {
    const allPhotos = await Photos.find({});
    res.render('photo/index.ejs', {
      photos: allPhotos
    })
  } catch (err) {
    res.send(err)
  }
})

router.get('/new', async (req,res) =>{

  try {
    const allUsers = await Users.find({});
        res.render('photo/new.ejs', {
        user: allUsers
        })
      } catch (err) {
        res.send(err)
  }
})



router.get('/:id', async (req,res) => {

  try {

    const foundPhotos = await Photos.findById(req.params.id);
    const foundUser = await Users.findOne({'photos._id': req.params.id});
    console.log(foundPhotos);
    console.log(foundUser)
            res.render('photo/show.ejs', {
             
              photo: foundPhotos,
              user: foundUser
          });
    } catch (err) {
        res.send(err)
    }
 });



router.post('/', async (req,res) => {

  try {

        const foundUser  = await Users.findById(req.body.userId);
        const createdPhoto = await Photos.create(req.body);
        await foundUser.photos.push(createdPhoto);
        await foundUser.save( );
        res.redirect('/photo');

        } catch (err) {
          res.send(err)
        }
  
        })

router.get('/:id/edit', (req, res)=>{
  Photos.findById(req.params.id, (err, foundPhoto)=>{

    res.render('photo/edit.ejs', {
      photo: foundPhoto
    });
  });
});


router.put('/:id', (req, res)=>{
    Photos.findOneAndUpdate(req.params.id, req.body, ()=>{
      res.redirect('/photo');
    });
  });

  router.delete('/:id', async (req, res) => {
    try {

        const user = await Users.findOne({'photos._id': req.params.id});
        const photo = await Photos.findById(req.params.id);
        user.photos.id(req.params.id).remove();
        console.log('deleting')

        await Photos.findByIdAndDelete(req.params.id);

        await user.save();
        res.redirect('/photo');
    } catch(err){
        res.send(err);
    }
})


module.exports = router;


