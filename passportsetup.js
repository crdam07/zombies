var passport = require("passport");
var Zombie = require("./models/zombie");

var LocalStrategy = require("passport-local").Strategy;

module.exports = () => {
    passport.serializeUser((zombie,done)=>{
        done(null, zombie._id);
    });
    passport.deserializeUser((id,done)=>{
        Zombie.findById(id, (err,zombie)=>{
            done(err,zombie);
        });
    });
};

passport.use("login", new LocalStrategy(function(username, password,done){
    Zombie.findOne({username: username}, function(err,Zombie){
        if (err){
            return done(err);
        }
        if (!zombie){
            return done(null,false,{message:"There is no zombie with that name"});
        }
        zombie.checkPassword(password,(err,isMatch)=>{
            if (err){
                return done(err);
            }
            if (isMatch){
                return done(null, zombie)
            } else {
                return done(null,false, {message:"The password is invalid"})
            }
        })
    })
}
))  