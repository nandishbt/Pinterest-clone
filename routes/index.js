var express = require('express');
var router = express.Router();

var usermodel = require('./users');
var postmodel = require('./posts');
var profmodel = require('./profilephoto');

var upload = require('./multer');

const localstrategy = require("passport-local");
const passport = require('passport');
passport.use(new localstrategy(usermodel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/profile' ,isLoggedIn , async function(req,res,next){

  var user = await usermodel.findOne({
    username : req.session.passport.user
    
  }).populate('prof').populate('posts');


  res.render("profile", {user});
})

router.get('/feed',function(req,res,next){
  res.render('feed');
})

router.get('/login' ,function(req,res){
  
  res.render('login',{error : req.flash('error')});
})

router.post('/register',function(req,res)
{
  const userdata = new usermodel({
    username : req.body.username,
    email: req.body.email,
    fullname : req.body.fullname
    

  })
  usermodel.register(userdata,req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      
      res.redirect("/profile")
    })
  })
})

router.post('/login',passport.authenticate('local',{successRedirect:'/profile',failureRedirect:'/login', failureFlash: true}),function(req,res){});

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err){return next(err)};
    res.redirect('/login');
  })
})

router.post('/uploads',isLoggedIn, upload.single('file'), async (req,res) =>{
  if(!req.file){
    return res.status(404).send('NO FILES UPLOADED');
  }

  var user = await usermodel.findOne({
    username : req.session.passport.user
  })

  var post = await postmodel.create({
    postText : req.file.filename,
    caption: req.body.caption,
    user : user._id
  })

  user.posts.push(post._id);
  await user.save();

  res.redirect('/profile')

})

router.post('/profuploads',isLoggedIn, upload.single('file'), async (req,res) =>{
  if(!req.file){
    return res.status(404).send('NO FILES UPLOADED');
  }

  var user = await usermodel.findOne({
    username : req.session.passport.user
  })

  var post = await profmodel.create({
    postText : req.file.filename,
    user : user._id
  })

  user.prof=post._id;
  await user.save();

  res.redirect('/profile')

})



function isLoggedIn(req,res,next){
  if(req.isAuthenticated())return next();
    
  
  res.redirect('/')

}

module.exports = router;
