



const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/errors");
const { ErrorResponse} = require("../utils/response");
const  {compareTime} = require("../utils/helpers/datetime-helpers");







function validateCreateRequest(req, res, next){
    if(!req.body.flightNumber){
        ErrorResponse.message = 'Something went wrong while creating flight.';
        ErrorResponse.data = new AppError(['flight Number not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.airplaneId){
        ErrorResponse.message = 'Something went wrong while creating flight.';
        ErrorResponse.data = new AppError(['flight airplaneId not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }


    if(!req.body.departureAirportId){
        ErrorResponse.message = 'Something went wrong while creating flight.';
        ErrorResponse.data = new AppError(['flight departureAirportId not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.arrivalAirportId){
        ErrorResponse.message = 'Something went wrong while creating flight.';
        ErrorResponse.data = new AppError(['flight arrivalAirportId not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }



    if(!req.body.arrivalTime){
        ErrorResponse.message = 'Something went wrong while creating flight.';
        ErrorResponse.data = new AppError(['flight arrivalTime not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }



    if(!req.body.departureTime){
        ErrorResponse.message = 'Something went wrong while creating flight.';
        ErrorResponse.data = new AppError(['flight departureTime not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }



    if(!req.body.price){
        ErrorResponse.message = 'Something went wrong while creating flight.';
        ErrorResponse.data = new AppError(['flight price not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }



    if(!req.body.totalSeats){
        ErrorResponse.message = 'Something went wrong while creating flight.';
        ErrorResponse.data = new AppError(['flight totalSeats not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(compareTime(req.body.arrivalTime, req.body.departureTime) == false ){
        ErrorResponse.message = 'Something went wrong while creating flight.';
        ErrorResponse.data = new AppError(['arrival time should be greater than departure time.'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    next();
}



module.exports = {
    validateCreateRequest
}