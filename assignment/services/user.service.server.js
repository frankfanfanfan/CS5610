var userModel = require("../model/user/user.model.server");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

var APPID = '237961773606907';
var SECRET = '3c2268078d49af9623029381d47f38cb';
// var facebookcallbackUrl = "https://localhost:3100/auth/facebook/callback";
var facebookcallbackUrl = "https://frank-web-project.herokuapp.com/auth/facebook/callback";

var facebookConfig = {
  clientID     : APPID,
  clientSecret : SECRET,
  callbackURL  : facebookcallbackUrl
};

module.exports = function (app) {

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  passport.use(new LocalStrategy(localStrategy));
  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

  app.post("/api/user", createUser);
  app.get("/api/user", findUserByAttribute);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  app.post("/api/login", passport.authenticate('local'), login);
  app.post("/api/logout", logout);
  app.post("/api/register", register);
  app.post("/api/loggedin", loggedin);
  app.get('/facebook/login', passport.authenticate('facebook', { scope : 'email' }));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/user',
      failureRedirect: '/login'
    }));

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  function localStrategy(username, password, done) {
    userModel
      .findUserByUsername(username)
      .then(
        function(user) {
          if(user && bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      );
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
  }

  function register (req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
      .createUser(user)
      .then(
        function(user){
          if(user){
            req.login(user, function(err) {
              if(err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        }
      );
  }

  function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function facebookStrategy(token, refreshToken, profile, done) {
    userModel
      .findUserByFacebookId(profile.id)
      .then(
        function(user) {
          if(user) {
            return done(null, user);
          } else {
            var names = profile.displayName.split(" ");
            var newFacebookUser = {
              lastName:  names[1],
              firstName: names[0],
              email:     profile.emails ? profile.emails[0].value:"",
              facebook: {
                id:    profile.id,
                token: token
              }
            };
            return userModel.createUser(newFacebookUser);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      )
      .then(
        function(user){
          return done(null, user);
        },
        function(err){
          if (err) { return done(err); }
        }
      );
  }




  function createUser(req, res) {
    // var user = req.body;
    // user._id = new Date().getTime();
    //
    // if (user) {
    //   users.push(user);
    //   res.status(200).send(user);
    // } else {
    //   res.sendStatus(500);
    // }
    var user = req.body;
    userModel.createUser(user)
      .then(function(newUser) {
        res.json(newUser);
      }, function(error) {
        res.status(500).json(error);
      });
  }

  function findUserByAttribute(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];

    if (username && password) {
      userModel.findUserByCredentials(username, password)
        .then(function(user) {
          if (!user) {
            res.status(401);
            res.json(user);
          } else {
            res.json(user);
          }
        }, function(err) {
          res.status(500).json(err);
        });
      return;
    } else if (username) {
      userModel.findUserByUsername(username)
        .then(function(user) {
          if (!user) {
            res.status(404);
            res.json(user);
          } else {
            res.json(user);
          }
        }, function(err) {
          res.status(500).json(err);
        });
      return;
    }
    res.status(404);
    res.send(undefined);
  }

  // function findUserByCredentials(req, res) {
  //   var username = req.query["username"];
  //   var password = req.query["password"];
  //
  //   for (var i in users) {
  //     var cur = users[i];
  //     if (cur.username === username && cur.password === password) {
  //       res.status(200).send(cur);
  //       return;
  //     }
  //   }
  //   res.status(404).send("No user found");
  // }
  //
  // function findUserByUsername(req, res) {
  //   var username = req.query["username"];
  //
  //   for (var i in users) {
  //     var cur = users[i];
  //     if (cur.username === username) {
  //       res.status(200).send(cur);
  //       return;
  //     }
  //   }
  //   res.status(404).send("No user found");
  // }

  function findUserById(req, res){
    // var userId = req.params["userId"];
    // var user = users.find(function (user) {
    //   return parseInt(user._id) === parseInt(userId);
    // });
    // if (user) {
    //   res.json(user);
    // } else {
    //   res.status(404);
    // }
    var userId = req.params["userId"];
    console.log("server: " + userId);
    return userModel.findUserById(userId)
      .then(function(user) {
        console.log(user);
        if (user) {
          res.json(user);
        } else {
          res.status(404);
          res.json(user);
        }
      }, function(err) {
        res.status(500).json(err);
    });
  }

  function updateUser(req, res){
    // var userId = req.params['userId'];
    // var user = req.body;
    //
    // for(var i = 0; i < users.length; i++) {
    //   if (users[i]._id === userId) {
    //     users[i].email = user.email;
    //     users[i].firstName = user.firstName;
    //     users[i].lastName = user.lastName;
    //
    //     res.status(200).send(user);
    //     return;
    //   }
    // }
    // res.status(404).send("not found!");
    var userId = req.params['userId'];
    var user = req.body;
    userModel.updateUser(userId, user)
      .then(function(status) {
        res.send(status);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function deleteUser(req, res) {
    // var userId = req.params['userId'];
    //
    // for (var i in users) {
    //   var user = users[i];
    //   if (parseInt(user._id === parseInt(userId))) {
    //     users.splice(i, 1);
    //     res.sendStatus(200);
    //     return;
    //   }
    // }
    // res.status(404).send("not found");
    var userId = req.params['userId'];

    userModel.deleteUser(userId)
      .then(function(status) {
        res.json(status);
      }, function(err) {
        res.status(500).json(err);
      });
  }
}
