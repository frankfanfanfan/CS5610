var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var pageModel = mongoose.model("pageModel", pageSchema);

var websiteModel = require("../website/website.model.server");

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(websiteId, page){
  page._website = websiteId;
  return pageModel.create(page)
    .then(function(responsePage) {
      websiteModel.findWebsiteById(responsePage._website)
        .then(function(website) {
          website.pages.push(responsePage);
          return website.save();
        });
      return responsePage;
    });
}

function findAllPagesForWebsite(websiteId) {
  return pageModel.find({_website: websiteId})
    .populate('_website')
    .exec();
}

function findPageById(pageId) {
  return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
  return pageModel.update({_id: pageId}, page);
}

function deletePage(pageId) {
  return pageModel.findById(pageId)
    .then(function(page) {
      websiteModel.findWebsiteById(page._website)
        .then(function(website) {
          website.pages.pull({_id: pageId});
          website.save();
        })
    }).then(function () {
      return pageModel.deleteOne({_id: pageId});
    });
}






