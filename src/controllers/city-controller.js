
const { StatusCodes } = require('http-status-codes');
const { CityService } = require('../services');
const {SuccessResponse, ErrorResponse} = require('../utils/response');

async function createCity(req,res){
    try{
        console.log(req.body.name);
        let city = await CityService.createCity({
            name: req.body.name
        })

        SuccessResponse.message = 'Successfully create an city.';
        SuccessResponse.data = city;

        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);

    }catch(error){
        ErrorResponse.message = 'Something went wrong while creating city.';
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getCity(req,res){
    try{

        let city = await CityService.getCity(req.params.id);
        SuccessResponse.message = "Successfully retrieved requested city.";
        SuccessResponse.data = city;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
                
    }catch(error){
        ErrorResponse.message = 'Something went wrong while retrieving city.';
        ErrorResponse.error = error;
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function destroyCity(req,res){
    try{
        let response = await CityService.destroyCity(req.params.id);
        SuccessResponse.message = 'Successfully deleted requested city.';
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    }catch(error){
        ErrorResponse.message = 'Something went wrong while deleting city.';
        ErrorResponse.error = error;
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}


async function updateCity(req,res){
    try{
        let response = await CityService.updateCity(req.params.id, req.body);
        SuccessResponse.message = 'Successfully update requested city.';
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    }catch(error){

        ErrorResponse.message = 'Something went wrong while updating city.';
        ErrorResponse.error = error;
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse)
    }
}




module.exports = {
    createCity,
    getCity,
    destroyCity,
    updateCity
}