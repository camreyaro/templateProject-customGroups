"use strict";

module.exports = {
  getCustomGroups: getCustomGroups,
  getCustomGroup: getCustomGroup,
  getCustomGroupByMetadata: getCustomGroupByMetadata,
  insertCustomGroup: insertCustomGroup,
  deleteCustomGroup: deleteCustomGroup
};

const assert = require("assert");
var mongoose = require("mongoose");

var modelsMongo = require("../utils/models");
var config = require("../config/config");

var logger = require("../config/logConfig");

//var uri = "mongodb://" + config.urlMongo + ":" + config.portMongo + "/sabius";
  var uri = "mongodb://camreyaro:sabius@ds149138.mlab.com:49138/customgroups"; //URI mLab
//var uri ="mongodb://" + "localhost" + ":" + "27017" + "/sabius";
mongoose.Promise = global.Promise;

var promise = mongoose.connect(uri);

function getCustomGroups(callback) {
  modelsMongo.customGroups.find({
  }, function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else {
      callback(null, data); //get groups
    }
  });
}

function getCustomGroup(groupName, year, callback) {
  modelsMongo.customGroups.find({
    "groupName": groupName,
    "year": year
  }, function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else {
      if (data.length > 0) {
        callback(null, data); //get group
      } else {
        callback(null, null); //not found
      }
    }
  });
}

function getCustomGroupByMetadata(metadata, value, callback) {
  modelsMongo.customGroups.find({
    [metadata]: value
  }, function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else {
      if (data.length > 0) {
        callback(null, data); //get group
      } else {
        callback(null, null); //not found
      }
    }
  });
}

function insertCustomGroup(newData, callback) {
  var groupName = newData[0].groupName;
  var year = newData[0].year;
  modelsMongo.customGroups.find({
    "groupName": groupName,
    "year": year
  }, function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else {
      if (data.length > 0) {
        callback(null, data); //conflict
      } else {
        modelsMongo.customGroups.collection.insert(newData, {
          ordered: true
        }, function (err) {
          if (err) {
            callback(err, null); //internal server error
          } else {
            callback(null, null); //created
          }
        });
      }
    }
  })
}

function deleteCustomGroup(groupName, year, callback) {
  modelsMongo.customGroups.find({
    "groupName": groupName,
    "year": year
  }, function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else if (data.length == 0) {
      callback(null, null); //not found
    } else {
      modelsMongo.customGroups.remove({
        "groupName": groupName,
        "year": year
      }, function (err, result) {
        if (err) {
          callback(err, null); //internal server error
        } else {
          callback(null, result); //deleted
        }
      });
    }
  });
}

