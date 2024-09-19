

const { StatusCodes } = require('http-status-codes');
const {AirportService} = require('../services');
const {ErrorResponse, SuccessResponse} = require('../utils/response');



async function createAirport(req,res){
    try{
        let airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });

        SuccessResponse.message = 'SuccessFully create an airport.';
        SuccessResponse.data = airport;

        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);

    }catch(error){

        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while creating airport.';
        return res
                .status(error.statusCode)
                .json(ErrorResponse);

    }
}



async function getAirports(req,res){
    try{
        let airports = await AirportService.getAirports();

        SuccessResponse.message = 'Successfully retrieve airports.';
        SuccessResponse.data = airports;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    }catch(error){

        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while retrieving airports.';
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}



async function getAirport(req,res){
    try{
        let airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.message = 'SuccessFully retrive an airport.';
        SuccessResponse.data = airport;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    }catch(error){

        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while retrieving airport.';
        return res
                .status(error.statusCode)
                .json(ErrorResponse);

    }
}



async function destroyAirport(req,res){
    try{
        let airport = await AirportService.destroyAirport(req.params.id);

        SuccessResponse.message = 'SuccessFully delete airport.';
        SuccessResponse.data = airport;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    }catch(error){

        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while deleting airport.';
        return res
                .status(error.statusCode)
                .json(ErrorResponse);

    }
}



async function updateAirport(req,res){
    try{
        let airport = await AirportService.updateAirport(req.params.id, req.body);

        SuccessResponse.message = 'SuccessFully update an airport.';
        SuccessResponse.data = airport;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    }catch(error){

        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while updating airport.';
        return res
                .status(error.statusCode)
                .json(ErrorResponse);

    }
}






module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}