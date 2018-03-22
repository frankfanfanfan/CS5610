module.exports = function (app) {

  var users = [
    {_id: "123", username: "alice",    password: "alice",    email: "", firstName: "Alice",  lastName: "Wonderland"  },
    {_id: "234", username: "bob",      password: "bob",      email: "", firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   email: "", firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", email: "", firstName: "Jose",   lastName: "Annunzi" }
  ];

  app.post("/api/user", createUser);
  app.get("/api/user", findUserByAttribute);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  function createUser(req, res) {
    var user = req.body;
    user._id = new Date().getTime();

    if (user) {
      users.push(user);
      res.status(200).send(user);
    } else {
      res.sendStatus(500);
    }
  }

  function findUserByAttribute(req, res) {
    if (req.query.password) {
      findUserByCredentials(req, res);
    } else {
      findUserByUsername(req, res);
    }
  }

  function findUserByCredentials(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];

    for (var i in users) {
      var cur = users[i];
      if (cur.username === username && cur.password === password) {
        res.status(200).send(cur);
        return;
      }
    }
    res.status(404).send("No user found");
  }

  function findUserByUsername(req, res) {
    var username = req.query["username"];

    for (var i in users) {
      var cur = users[i];
      if (cur.username === username) {
        res.status(200).send(cur);
        return;
      }
    }
    res.status(404).send("No user found");
  }

  function findUserById(req, res){
    var userId = req.params["userId"];
    var user = users.find(function (user) {
      return parseInt(user._id) === parseInt(userId);
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404);
    }
  }

  function updateUser(req, res){
    var userId = req.params['userId'];
    var user = req.body;

    for(var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        users[i].email = user.email;
        users[i].firstName = user.firstName;
        users[i].lastName = user.lastName;

        res.status(200).send(user);
        return;
      }
    }
    res.status(404).send("not found!");
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];

    for (var i in users) {
      var user = users[i];
      if (parseInt(user._id === parseInt(userId))) {
        users.splice(i, 1);
        res.sendStatus(200);
        return;
      }
    }
    res.status(404).send("not found");
  }
}
