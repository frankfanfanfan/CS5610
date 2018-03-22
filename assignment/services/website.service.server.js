module.exports = function(app){


  var WEBSITES = [
    {"_id": "321", "name": "Facebook", developerId: "123", description: "test"},
    {"_id": "432", "name": "Twitter", developerId: "234", description: "test"},
    {"_id": "234", "name": "Amazon", developerId: "345", description: "test"},
    {"_id": "333", "name": "MyWebSite", developerId: "123", description: "test"}
  ];

  // var WEBSITES = require("./website.mock.server");

  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  function createWebsite(req, res){
    var userId = req.params['userId'];
    var website = req.body;
    website._id = new Date().getTime();
    website.developerId = userId;

    if (website) {
      WEBSITES.push(website);
      res.status(200).send(website);
    } else {
      res.sendStatus(500);
    }
  }

  function findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];
    var websites= [];

    for (var i in WEBSITES) {
      if (WEBSITES[i].developerId == userId) {
        websites.push(WEBSITES[i]);
      }
    }
    res.status(200).send(websites);
  }


  function findWebsiteById(req, res){
    var websiteId = req.params['websiteId'];

    for (var i in WEBSITES) {
      if (WEBSITES[i]._id == websiteId) {
        res.status(200).send(WEBSITES[i]);
        return;
      }
    }
    res.status(404).send("not found");
  }

  function updateWebsite(req, res){
    var websiteId = req.params['websiteId'];
    var newWebSite = req.body;

    for(var i = 0; i < WEBSITES.length; i++) {
      if (WEBSITES[i]._id == websiteId) {
        WEBSITES[i].name = newWebSite.name;
        WEBSITES[i].developerId = newWebSite.developerId;
        WEBSITES[i].description = newWebSite.description;
        res.status(200).send(newWebSite);
        return;
      }
    }
    res.status(404).send("not found");
  }

  function deleteWebsite(req, res){
    var websiteId = req.params['websiteId'];
    for(var i = 0; i < WEBSITES.length; i++) {
      if (WEBSITES[i]._id == websiteId) {
        WEBSITES.splice(i, 1);
        res.sendStatus(200);
        return;
      }
    }
    res.status(404).send("not found");
  }
}
