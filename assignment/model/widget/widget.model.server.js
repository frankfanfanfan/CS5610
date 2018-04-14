var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var widgetModel = mongoose.model('widgetModel', widgetSchema);

var pageModel = require("../page/page.model.server");

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget){
  widget._page = pageId;
  return widgetModel.create(widget)
    .then(function(responseWidget) {
      pageModel.findPageById(responseWidget._page)
        .then(function(page) {
          page.widgets.push(responseWidget);
          return page.save();
        });
      return responseWidget;
    });
}

function findAllWidgetsForPage(pageId) {
  return pageModel.findPageById(pageId)
    .then(function(page) {
      return page.widgets;
    });
}

function findWidgetById(widgetId) {
  return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
  widgetModel.findById(widgetId)
    .then(function(foundWidget) {
      pageModel.findPageById(foundWidget._page)
        .then(function(page) {
          for (var i = 0; i < page.widgets.length; i++) {
            if (String(page.widgets[i]._id) === String(widgetId)) {
              page.widgets[i] = widget;
            }
          }
          page.save();
        })
    });
  return widgetModel.update({_id: widgetId}, widget);
}

function deleteWidget(widgetId) {
  widgetModel.findById(widgetId)
    .then(function(widget) {
      pageModel.findPageById(widget._page)
        .then(function(page) {
          page.widgets.pull({_id: widgetId});
          page.save();
        })
    });
  return widgetModel.remove({_id: widgetId});
}

function reorderWidget(pageId, start, end) {
  return pageModel.findPageById(pageId)
    .then(function(page) {
      const preWidget = page.widgets[start];
      page.widgets.splice(start, 1);
      page.widgets.splice(end, 0, preWidget);
      return page.save();
    });
}
