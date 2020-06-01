const express = require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const passport=require("passport");
const session =require("express-session");
const ejs = require('ejs');

const app =express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  secret:"dark secret.",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

//mongoose.connect("mongodb+srv://admin:test2ter0-6ef3z.mongodb.net/userDB",{useUnifiedTopology: true,useNewUrlParser: true});
mongoose.set("useCreateIndex",true);

const userSchema= new mongoose.Schema({
  username:String,
  password:String,
  arr:[]
});
userSchema.plugin(passportLocalMongoose);
const User=new mongoose.model("User",userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.listen(3000,function(){
  console.log("server started");
});

app.get("/",function(req,res){
  res.sendFile(__dirname+'/index.html');
});

app.post('/register',function(req,res){
  User.register({username:req.body.username},req.body.password,function(err,user){
    if(err){
      console.log(err);
      res.redirect("/");
    }else{
        res.redirect("/dash");
    }
  });
});
app.post("/",function(req,res){
  const user=new User({
     username:req.body.username,
     password:req.body.password
   });
   req.login(user,function(err){
     if(err){
       console.log(err);
     }else{
       passport.authenticate("local")(req,res,function(){
         res.redirect('/dash');
       });
     }
   });
});

app.get('/dash',function(req,res){
//  if(req.isAuthenticated()){

          res.render('list',{ user: "req.user"});
  //});
   //}else{
   //res.redirect("/");
  // }
});
