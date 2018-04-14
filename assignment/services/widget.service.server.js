

module.exports = function(app){
  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname+'/../../src/assets/uploads' });

  // var WIDGETS = [
  //   { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
  //   { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
  //   { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "text": "test", "width": "100%", "url": "https://static.cnbetacdn.com/article/2018/0322/5cf558649eb23d8.jpg"},
  //   { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
  //   { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "text": "test", "width": "100%", "url": "https://www.youtube.com/embed/AM2Ivdi9c4E" }
  // ];

  var widgetModel = require("../model/widget/widget.model.server");

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.post ("/api/upload", upload.single('myFile'), uploadImage);
  app.put("/api/page/:pageId/widget", reorderWidgets);

  function createWidget(req, res){
    // var pageId = req.params['pageId'];
    // var widget = req.body;
    // widget._id = new Date().getTime();
    // widget.pageId = pageId;
    //
    // if (widget) {
    //   WIDGETS.push(widget);
    //   res.status(200).send(widget);
    // } else {
    //   res.sendStatus(500);
    // }
    var pageId = req.params['pageId'];
    var widget = req.body;
    widgetModel.createWidget(pageId, widget)
      .then(function() {
        res.sendStatus(200);
      });
  }

  function findAllWidgetsForPage(req, res) {
    // var pageId = req.params['pageId'];
    // var result = [];
    //
    // for (var i in WIDGETS) {
    //   if (WIDGETS[i].pageId == pageId) {
    //     result.push(WIDGETS[i]);
    //   }
    // }
    //
    // res.status(200).send(result);
    var pageId = req.params["pageId"];
    widgetModel.findAllWidgetsForPage(pageId)
      .then(function(widgets) {
        res.json(widgets);
      }, function(err) {
        res.status(500).json(err);
      });
  }


  function findWidgetById(req, res){
    // var widgetId = req.params['widgetId'];
    //
    // for (var i in WIDGETS) {
    //   if (WIDGETS[i]._id == widgetId) {
    //     res.status(200).send(WIDGETS[i]);
    //     return;
    //   }
    // }
    // res.status(404).send("not found");
    var widgetId = req.params["widgetId"];
    widgetModel.findWidgetById(widgetId).then(function(widget) {
      if (widget) {
        res.json(widget);
      } else {
        res.status(404);
        res.json(widget);
      }
    }, function(err) {
      res.status(500).json(err);
    });
  }

  function updateWidget(req, res){
    // var widgetId = req.params['widgetId'];
    // var newWidget = req.body;
    //
    // for(var i in WIDGETS) {
    //   if (WIDGETS[i]._id == widgetId) {
    //     WIDGETS[i] = newWidget;
    //     res.status(200).send(newWidget);
    //     return;
    //   }
    // }
    // res.status(404).send("not found");
    var widgetId = req.params["widgetId"];
    var widget = req.body;
    widgetModel.updateWidget(widgetId, widget)
      .then(function(status) {
        res.send(status);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function deleteWidget(req, res){
    // var widgetId = req.params['widgetId'];
    // for(var i = 0; i < WIDGETS.length; i++) {
    //   if (WIDGETS[i]._id == widgetId) {
    //     WIDGETS.splice(i, 1);
    //     res.sendStatus(200);
    //     return;
    //   }
    // }
    // res.status(404).send("not found");
    var widgetId = req.params["widgetId"];
    widgetModel.deleteWidget(widgetId)
      .then(function(status) {
        res.json(status);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    if (myFile == null || myFile == "") {
      return "http://localhost:4200/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
      // return "https://frank-web-project.herokuapp.com/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
    }

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    // widget = getWidgetById(widgetId);
    //
    // function getWidgetById(wgId) {
    //   if (wgId === undefined || wgId === null || wgId === '') {
    //     var newWidget = {
    //       "_id": new Date().getTime() + '',
    //       "widgetType": "IMAGE",
    //       "pageId": pageId,
    //       "size": "size",
    //       "text": "text",
    //       "width": "100%"
    //     };
    //     WIDGETS.push(newWidget);
    //     return newWidget;
    //   } else {
    //     console.log("exist");
    //     for (var i in WIDGETS) {
    //       if (WIDGETS[i]._id == wgId) {
    //         console.log(WIDGETS[i]);
    //         return WIDGETS[i];
    //       }
    //     }
    //   }
    // }
    //
    // widget.url = '/uploads/'+filename;

    var url = '/uploads/'+filename;
    console.log(filename);

    if (widgetId === undefined || widgetId === null || widgetId === '') {
      var widget = {
        widgetType: "IMAGE",
        _page: pageId,
        size: 1,
        text: 'text',
        width: width,
        url: url
      };

      widgetModel.createWidget(pageId, widget)
        .then(function (widget) {
            // if (widget) {
            //   res.json(widget);
            // } else {
            //   widget = null;
            //   res.send(widget);
            // }
            res.redirect("http://localhost:4200/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/")
          }, function(error) {

        });
    } else {
      widgetModel.findWidgetById(widgetId)
        .then(function(widget) {
            widget.url = url;
            widgetModel.updateWidget(widgetId, widget)
              .then(function (widget) {
                  res.redirect("http://localhost:4200/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
                }, function() {
                  res.status(400).send("Upload error");
                });
          });
    }
    // var callbackUrl = "https://frank-web-project.herokuapp.com/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/";
    // var callbackUrl = "http://localhost:4200/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/";
    // res.redirect(callbackUrl);
  }

  function reorderWidgets(req, res) {
    // var pageId = req.params['pageId'];
    // var initial = req.query["initial"];
    // var final = req.query["final"];
    //
    // var tmpInitial = 0;
    // var tmpFinal = 0;
    // var count = 0;
    //
    // for (var i = 0; i < WIDGETS.length; i++) {
    //   if (WIDGETS[i].pageId == pageId) {
    //     if (initial == count) tmpInitial = i;
    //     if (final == count) tmpFinal = i;
    //     count++;
    //   }
    // }
    //
    // var preWidget = WIDGETS[initial];
    // WIDGETS.splice(tmpInitial, 1);
    // WIDGETS.splice(tmpFinal, 0, preWidget);
    // res.json(WIDGETS);

    var pageId = req.params['pageId'];
    var initial = req.query["initial"];
    var final = req.query["final"];
    widgetModel.reorderWidget(pageId, initial, final)
      .then(function() {
        res.sendStatus(200);
      }, function (error) {
        res.sendStatus(400).send(error);
      });
  }

}
