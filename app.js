const express = require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const passport=require("passport");
const session =require("express-session");
const ejs = require('ejs');
const swal = require('sweetalert');
const app =express();
const server=app.listen(process.env.PORT || 3000,function(){
  console.log("Server running >>>");
});
const io =require("socket.io")(server);

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

mongoose.connect("mongodb+srv://admin:test123@cluster0-6ef3z.mongodb.net/todoDB",{useUnifiedTopology: true,useNewUrlParser: true});
mongoose.set("useCreateIndex",true);

const userSchema= new mongoose.Schema({
  username:String,
  password:String,
  name: String,
  arr:[],
  archive:[]
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



app.get("/",function(req,res){
  res.sendFile(__dirname+'/index.html');
});
app.post('/register',function(req,res){
   User.register({username:req.body.username, name:req.body.name},req.body.password,function(err,user){
    if(err){
      console.log(err);
      res.redirect("/");
    }else{
      res.redirect("/");
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
app.post('/addField',function(req,res){
  User.findById(req.body.id,function(err,foundUser){
  if(err){
     console.log(err);
    }else{
      if(foundUser){
        var tk=[];
        var feild ={
          title:req.body.fieldname,
          task: tk
        }
        foundUser.arr.push(feild);
        foundUser.save();
        res.redirect('/dash');
      }
    }
   });
});
var act="erw";
app.post('/addtask',function(req,res){
  User.findById(req.body.id,function(err,foundUser){
  if(err){
     console.log(err);
    }else{
      if(foundUser){
        var tk=foundUser.arr;
        for (var i = 0; i < tk.length; i++){
            if (tk[i].title == req.body.taskName){
                var temp ={
                  val:req.body.newItem.trim(),
                  due:req.body.due,
                  status:0
                }
                tk[i].task.push(temp);
                foundUser.markModified("arr");
                foundUser.save();
                act = req.body.taskName;
                res.redirect('/dash');
            }
        }
      }
    }
   });
});
app.post("/delete",function(req,res){
  User.findById(req.body.id,function(err,foundUser){
  if(err){
     console.log(err);
    }else{
      if(foundUser){
        var tk = foundUser.arr;
        for (var i = 0; i < tk.length; i++){
            if (tk[i].title == req.body.taskName){
                var tt = tk[i].task;
                for(var k =0;k<tt.length;k++){
                  if(tt[k].val == req.body.task){
                    break;
                  }
                }
                console.log(req.body.task);
                tk[i].task.splice(k,1);
                var day =  new Date().toISOString().split("T")[0];
                var trer = {
                  title:req.body.taskName,
                  task:req.body.task,
                  due:req.body.duedate,
                  comp:day
                };
                foundUser.archive.push(trer);
                //tk[i].task.forEach(function(t){
                  //console.log(t.val+" "+t.due);
                //});
                foundUser.markModified("arr");
                foundUser.markModified("archive");
                foundUser.save();
                act = req.body.taskName;
                res.redirect('/dash');
            }
        }
      }
    }
   });

});

app.post("/clear",function(req,res){
  User.findById(req.body.id,function(err,foundUser){
  if(err){
     console.log(err);
    }else{
      if(foundUser){
        var tk=foundUser.arr;
        for (var m = 0; m< tk.length; m++){
            if (tk[m].title == req.body.taskName){
            break;
          }
        }
        foundUser.arr.splice(m,1);
        foundUser.markModified("arr");
        foundUser.save();
        act = req.body.taskName;
        res.redirect('/dash');
      }
    }
  });
});

io.on("connection",function(socket){
  io.emit('active',act);

  socket.on('check',function(data){
    User.findById(data.personid,function(err,foundUser){
    if(err){
       console.log(err);
      }else{
        if(foundUser){
          var tk = foundUser.arr;
          for (var i = 0; i < tk.length; i++){
              if (tk[i].title == data.titlename){
                  var tt = tk[i].task;
                  console.log(tk[i].title);
                  for(var k =0;k<tt.length;k++){
                    if(tt[k].val == data.task){
                      console.log(tt[k].val);
                      break;
                    }
                  }
                  tk[i].task[k].status=1;
                  foundUser.markModified("arr");
                  foundUser.save();
              }
          }
        }
      }
     });
  });
 });
app.get('/dash',function(req,res){
   if(req.isAuthenticated()){
    res.render('list',{ person:req.user});
  }

});
app.get('/logout',function(req,res){
  req.logout();
  res.redirect("/");
});
