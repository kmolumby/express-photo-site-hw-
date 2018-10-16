const express = require('express');
const router  = express.Router();

router.get('/', (req,res) => {
    res.render('user/index.ejs')
})


router.get('/new', (req,res) =>{
    res.render('user/new.ejs')
})

module.exports = router;
