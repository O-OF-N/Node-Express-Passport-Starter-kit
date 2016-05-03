var log4js = require('log4js');
var logger = log4js.getLogger("app");

//Send success response
var sendSuccessResponse = function (res, json) {
    try {
        logger.trace('entering sendJsonResponse');
        res.json(json);
    } catch (err) {
        logger.error('sendJsonResponse: rendering json response failed with error:' + err);
    } finally{
        logger.trace('leaving sendJsonResponse');
    }
};

//Send error response
var sendErrorResponse = function (res, err) {
    try {
        logger.trace('entering sendErrorResponse');
        res.json(err);
    } catch (err) {
        logger.error('sendErrorResponse: rendering json response failed with error:' + err);
    } finally{
        logger.trace('leaving sendErrorResponse');
    }
};

module.exports.sendSuccessResponse = sendSuccessResponse;
module.exports.sendErrorResponse = sendErrorResponse;