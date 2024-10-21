const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/response");



async function createFlight(req, res){

    try {
        let flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
    
        SuccessResponse.message = 'SuccessFully create an flight';
        SuccessResponse.data = flight;

        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while creating flight.';
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }

}



async function getAllFlights(req, res){

    try {
        let flight = await FlightService.getAllFlights(req.query)
    
        SuccessResponse.message = 'SuccessFully get flights';
        SuccessResponse.data = flight;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while getting flights.';
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}



async function getFlight(req, res){
    try{    
        let flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.message = 'Successfully retrieved requested flight.';
        SuccessResponse.data = flight;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    }catch(error){
        
        ErrorResponse.message = 'Something went wrong while retrieving flight.';
        ErrorResponse.error = error;

        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);

    }
}


async function updateSeats(req, res){
    try{    
        let flight = await FlightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            dec: req.body.dec
        });
        SuccessResponse.message = 'Successfully updated seats.';
        SuccessResponse.data = flight;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    }catch(error){
        
        ErrorResponse.message = 'Something went wrong while updating flight: seats.';
        ErrorResponse.error = error;

        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);

    }
}


module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}