const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/errors");
const { ErrorResponse} = require("../utils/response");







function validateCreateRequest(req, res, next){
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong while creating airport.';
        ErrorResponse.data = new AppError(['airport Number not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.code){
        ErrorResponse.message = 'Something went wrong while creating airport.';
        ErrorResponse.data = new AppError(['airport code not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }


    if(!req.body.cityId){
        ErrorResponse.message = 'Something went wrong while creating airport.';
        ErrorResponse.data = new AppError(['airport cityId not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}



module.exports = {
    validateCreateRequest
}