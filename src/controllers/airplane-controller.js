const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const {SuccessResponse, ErrorResponse} = require('../utils/response');






async function createAirplane(req, res){
    try{
        let airplane = await AirplaneService.createAirplane({
            modelName: req.body.modelName,
            capacity: req.body.capacity 
        });
        SuccessResponse.message = 'SuccessFully create an airplane';
        SuccessResponse.data = airplane;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while creating airplane';
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getAirplanes(req, res){
    try{    
        let airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.message = 'Successfully retrieved airplanes.';
        SuccessResponse.data = airplanes;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    }catch(error){
        console.log(ErrorResponse);
        
        ErrorResponse.message = 'Something went wrong while retrieving airplanes.';
        ErrorResponse.error = error;
        
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);

    }
}


async function getAirplane(req, res){
    try{    
        let airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.message = 'Successfully retrieved requested airplane.';
        SuccessResponse.data = airplane;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    }catch(error){
        
        ErrorResponse.message = 'Something went wrong while retrieving airplane.';
        ErrorResponse.error = error;

        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);

    }
}

async function destroyAirplane(req, res){

    try{
        let response = await AirplaneService.destroyAirplane(req.params.id);
        SuccessResponse.message = 'Succuessfully delete an airplane';
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    }catch(error){

        ErrorResponse.message = 'Something went wrong while deleting airplane.';
        ErrorResponse.error = error;

        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);

    }

}


async function updateAirplane(req,res){
    try{

        let data = req.body;
        let response = await AirplaneService.updateAirplane(req.params.id, data);

        SuccessResponse.message = 'Update successful.';
        SuccessResponse.data = response;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    }catch(error){

        ErrorResponse.message = 'Something went wrong while updating airplane.';
        ErrorResponse.error = error;

        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);

    }
}


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}



