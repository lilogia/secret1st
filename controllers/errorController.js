const httpStatus = require("http-status-codes");

exports.errorPageNotFound = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.render("error");
};

exports.errorInternalServer = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR: There is an error in server ${error.stack}`);
    res.status(errorCode);
    res.send("Internal Server Error");
};