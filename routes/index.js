var express = require('express');
var router = express.Router();
var usermodel = require('./users')

const localstrategy = require("passport-local");
const passport = require('passport');
passport.use(new localstrategy(usermodel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/profile' ,isLoggedIn ,function(req,res,next){
  res.render("profile");
})

router.get('/feed',function(req,res,next){
  res.render('feed');
})

router.get('/login' ,function(req,res){
  res.render('login');
})

router.post('/register',function(req,res){
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

router.post('/login',passport.authenticate('local',{successRedirect:'/profile',failureRedirect:'/'}),function(req,res){});

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err){return next(err)};
    res.redirect('/');
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated())return next();
    
  
  res.redirect('/')

}

module.exports = router;
