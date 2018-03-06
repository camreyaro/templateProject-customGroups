'use strict';

var url = require('url');

var Groups = require('./CustomGroupsService');

module.exports.deleteCustomGroup = function deleteCustomGroup(req, res, next) {
  Groups.deleteCustomGroup(req.swagger.params, res, next);
};

module.exports.getCustomGroups = function getCustomGroups(req, res, next) {
  Groups.getCustomGroups(req.swagger.params, res, next);
};

module.exports.getCustomGroup = function getCustomGroup(req, res, next) {
  Groups.getCustomGroup(req.swagger.params, res, next);
};

module.exports.insertCustomGroup = function insertCustomGroup(req, res, next) {
  Groups.insertCustomGroup(req.swagger.params, res, next);
};
