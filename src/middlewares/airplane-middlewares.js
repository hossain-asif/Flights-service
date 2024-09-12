const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/response");



function validateCreateRequest(req, res, next){

    if(!req.body.modelName){
        ErrorResponse.message = 'Something went wrong while creating airplane.';
        ErrorResponse.error = new AppError([ 'Model Number not found in the incoming request in the correct form' ], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();

}


module.exports = {
    validateCreateRequest
}