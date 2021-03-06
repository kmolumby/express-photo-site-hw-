const express = require('express');
const app = express ();

require('./db/db')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const userController = require('./controllers/user');
const photoController = require('./controllers/photo')




app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use('/photo', photoController);
app.use('/user', userController);

app.get ('/', (req,res) => {
 res.render('index.ejs')
})
app.listen(3000, () => {
    console.log('listening on port 3000')
} )

