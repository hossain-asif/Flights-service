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


module.exports = {
    createFlight,
    getAllFlights
}