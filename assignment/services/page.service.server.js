module.exports = function(app){


  // var pages = [
  //   {"_id": "321", "name": "page321", websiteId: "321", title: "test page 321"},
  //   {"_id": "111", "name": "page111", websiteId: "321", title: "test page 111"},
  //   {"_id": "222", "name": "page222", websiteId: "222", title: "test page 222"},
  //   {"_id": "333", "name": "page333", websiteId: "333", title: "test page 333"},
  //   {"_id": "432", "name": "page432", websiteId: "432", title: "test page 432"},
  //   {"_id": "234", "name": "page234", websiteId: "234", title: "test page 234"}
  // ];

  var pageModel = require("../model/page/page.model.server");

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);


  function createPage(req, res){
    // var websiteId = req.params['websiteId'];
    // var page = req.body;
    // page._id = new Date().getTime();
    // page.websiteId = websiteId;
    //
    // if (page) {
    //   pages.push(page);
    //   res.status(200).send(page);
    // } else {
    //   res.sendStatus(500);
    // }
    var createdPage = req.body;
    var websiteId = req.params["websiteId"];
    pageModel.createPage(websiteId, createdPage)
      .then(function (page){
        res.json(page);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function findAllPagesForWebsite(req, res) {
    // var websiteId = req.params['websiteId'];
    // var result= [];
    //
    // for (var i in pages) {
    //   if (pages[i].websiteId == websiteId) {
    //     result.push(pages[i]);
    //   }
    // }
    // res.status(200).send(result);
    var websiteId = req.params["websiteId"];
    pageModel.findAllPagesForWebsite(websiteId)
      .then(function(pages) {
        res.json(pages);
      }, function(err) {
        res.status(500).json(err);
      });
  }


  function findPageById(req, res){
    // var pageId = req.params['pageId'];
    //
    // for (var i in pages) {
    //   if (pages[i]._id == pageId) {
    //     res.status(200).send(pages[i]);
    //     return;
    //   }
    // }
    // res.status(404).send("not found");
    var pageId = req.params["pageId"];
    pageModel.findPageById(pageId).then(function(page) {
      if (page) {
        res.json(page);
      } else {
        res.status(404);
        res.json(page);
      }
    }, function(err) {
      res.status(500).json(err);
    });
  }

  function updatePage(req, res){
    // var pageId = req.params['pageId'];
    // var newPage = req.body;
    //
    // for(var i = 0; i < pages.length; i++) {
    //   if (pages[i]._id == pageId) {
    //     pages[i].name = newPage.name;
    //     pages[i].websiteId = newPage.websiteId;
    //     pages[i].title = newPage.title;
    //     res.status(200).send(newPage);
    //     return;
    //   }
    // }
    // res.status(404).send("not found");
    var pageId = req.params["pageId"];
    var page = req.body;
    pageModel.updatePage(pageId, page)
      .then(function(status) {
        res.send(status);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function deletePage(req, res){
    // var pageId = req.params['pageId'];
    // for(var i = 0; i < pages.length; i++) {
    //   if (pages[i]._id == pageId) {
    //     pages.splice(i, 1);
    //     res.sendStatus(200);
    //     return;
    //   }
    // }
    // res.status(404).send("not found");
    var pageId = req.params["pageId"];
    pageModel.deletePage(pageId)
      .then(function(status) {
        res.json(status);
      }, function(err) {
        res.status(500).json(err);
      });
  }
}
