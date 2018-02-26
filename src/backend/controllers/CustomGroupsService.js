"use strict";

const request = require("request");
const Promise = require("bluebird");

const mongo = require("../utils/mongo");
const config = require("../config/config");
const logger = require("../config/logConfig");

exports.getCustomGroups = function(args, res, next) {
  /**
   * Returns all groups
   *
   * returns List
   **/
  logger.info("Get Groups");
  mongo.getCustomGroups(function(err, data) {
    if (err) {
      logger.info(err);
      res.sendStatus(500); // internal server error
    } else {
      logger.info(data);
      logger.info("Get!");
      res.send(data);
    }
  });
};

exports.getCustomGroup = function(args, res, next) {
  /**
   * Return an existing group
   *
   * returns List
   **/
  var groupName = args.groupName.value;
  var year = args.year.value;
  logger.info("Get " + groupName + " " + year);
  if (!year) {
    logger.info("Bad request");
    res.sendStatus(400); // bad request
  } else if (!groupName) {
    logger.info("Bad request");
    res.sendStatus(400); // bad request
  } else {
    mongo.getCustomGroup(groupName, year, function(err, data) {
      if (err) {
        logger.info(err);
        res.sendStatus(500); // internal server error
      } else if (data) {
        logger.info("Get group!");
        res.send(data);
      } else {
        logger.info("Not found");
        res.sendStatus(404);
      }
    });
  }
};

exports.getCustomGroupByMetadata = function(args, res, next) {
  /**
   * Return an existing group
   *
   * returns List
   **/
  var metaDataField = args.metaDataField.value;
  var value = args.value.value;
  logger.info("Get " + metaDataField + " " + value);
  if (!metaDataField) {
    logger.info("Bad request");
    res.sendStatus(400); // bad request
  } else if (!value) {
    logger.info("Bad request");
    res.sendStatus(400); // bad request
  } else {
    mongo.getCustomGroupByMetadata(metaDataField, value, function(err, data) {
      if (err) {
        logger.info(err);
        res.sendStatus(500); // internal server error
      } else if (data) {
        logger.info("Get groups!");
        res.send(data);
      } else {
        logger.info("Not found");
        res.sendStatus(404);
      }
    });
  }  
};

exports.insertCustomGroup = function(args, res, next) {
  /**
   * Insert a new group
   *
   * group List The group JSON you want to post
   * no response value expected for this operation
   **/
  var customGroup = args.customGroup.value;
  logger.info("Inserting document");
  if (!customGroup[0]) {
    logger.info("Bad Request");
    res.sendStatus(400); // bad request
  } else {
    if (
      customGroup[0].groupName &&
      customGroup[0].year &&
      customGroup[0].researchers &&
      customGroup[0].groupName != undefined &&
      customGroup[0].year != undefined &&
      customGroup[0].researchers != undefined
    ) {
      var flag = 0;
      for (var i = 0; i < customGroup[0].researchers.length; i++) {
        if (!customGroup[0].researchers[i].name || (!customGroup[0].researchers[i].orcid && !customGroup[0].researchers[i].authorId)) {
          flag = 1;
          break;
        }
      }
      if (flag != 0) {
        console.log("Mu mal");
        logger.info("Unprocessable entity");
        res.sendStatus(422); // unprocessable entity
      } else {
        mongo.insertCustomGroup(customGroup, function(err, data) {
          if (err) {
            logger.info(err);
            res.sendStatus(500); // internal server error
          } else if (data) {
            logger.info("409 Conflict");
            res.sendStatus(409); //conflict
          } else {
            logger.info("Saved!");
            res.sendStatus(201); // created
            res.end();
          }
        });
      }
    } else {
      console.log("Mal");
      logger.info("Unprocessable entity");
      res.sendStatus(422); // unprocessable entity
    }
  }
};

exports.deleteCustomGroup = function(args, res, next) {
  /**
   * Delete an existing group
   *
   * groupName String Name of an existing group
   * year String An existing year of the group
   * no response value expected for this operation
   **/
  var groupName = args.groupName.value;
  var year = args.year.value;
  logger.info("Deleting " + groupName + " " + year);
  if (!groupName || !year) {
    logger.info("Bad Request");
    res.sendStatus(400).end();
  } else {
    mongo.deleteCustomGroup(groupName, year, function(err, result) {
      if (err) {
        logger.info(err);
        res.sendStatus(500).end(); // internal server error
      } else if (result) {
        logger.info("Deleted!");
        res.sendStatus(204).end(); // no content
      } else {
        logger.info("Not found");
        res.sendStatus(404).end(); // not found
      }
    });
  }
};