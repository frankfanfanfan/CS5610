module.exports = function(app){


  // var WEBSITES = [
  //   {"_id": "321", "name": "Facebook", developerId: "123", description: "test"},
  //   {"_id": "432", "name": "Twitter", developerId: "234", description: "test"},
  //   {"_id": "234", "name": "Amazon", developerId: "345", description: "test"},
  //   {"_id": "333", "name": "MyWebSite", developerId: "123", description: "test"}
  // ];

  var websiteModel = require('../model/website/website.model.server');

  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  function createWebsite(req, res){
    var userId = req.params['userId'];
    var website = req.body;
    // website._id = new Date().getTime();
    // website.developerId = userId;
    //
    // if (website) {
    //   WEBSITES.push(website);
    //   res.status(200).send(website);
    // } else {
    //   res.sendStatus(500);
    // }
    websiteModel.createWebsiteForUser(userId, website)
      .then(function(newWebsite) {
        res.json(newWebsite);
      }, function(error) {
        res.status(500).json(error);
      });
  }

  function findAllWebsitesForUser(req, res) {
    // var userId = req.params['userId'];
    // var websites= [];
    //
    // for (var i in WEBSITES) {
    //   if (WEBSITES[i].developerId == userId) {
    //     websites.push(WEBSITES[i]);
    //   }
    // }
    // res.status(200).send(websites);
    var userId = req.params["userId"];
    websiteModel.findAllWebsitesForUser(userId)
      .then(function(websites) {
        res.json(websites);
      }, function(err) {
        res.status(500).json(err);
      });
  }


  function findWebsiteById(req, res){
    // var websiteId = req.params['websiteId'];
    //
    // for (var i in WEBSITES) {
    //   if (WEBSITES[i]._id == websiteId) {
    //     res.status(200).send(WEBSITES[i]);
    //     return;
    //   }
    // }
    // res.status(404).send("not found");
    var websiteId = req.params["websiteId"];
    websiteModel.findWebsiteById(websiteId)
      .then(function(website) {
        if (website) {
          res.json(website);
        } else {
          res.status(404);
          res.json(website);
        }
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function updateWebsite(req, res){
    // var websiteId = req.params['websiteId'];
    // var newWebSite = req.body;
    //
    // for(var i = 0; i < WEBSITES.length; i++) {
    //   if (WEBSITES[i]._id == websiteId) {
    //     WEBSITES[i].name = newWebSite.name;
    //     WEBSITES[i].developerId = newWebSite.developerId;
    //     WEBSITES[i].description = newWebSite.description;
    //     res.status(200).send(newWebSite);
    //     return;
    //   }
    // }
    // res.status(404).send("not found");
    var websiteId = req.params["websiteId"];
    var website = req.body;
    websiteModel.updateWebsite(websiteId, website)
      .then(function(status) {
        res.send(status);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function deleteWebsite(req, res){
    // var websiteId = req.params['websiteId'];
    // for(var i = 0; i < WEBSITES.length; i++) {
    //   if (WEBSITES[i]._id == websiteId) {
    //     WEBSITES.splice(i, 1);
    //     res.sendStatus(200);
    //     return;
    //   }
    // }
    // res.status(404).send("not found");
    var websiteId = req.params["websiteId"];
    websiteModel.deleteWebsite(websiteId)
      .then(function(status) {
        res.json(status);
      }, function(err) {
        res.status(500).json(err);
      });
  }
}
