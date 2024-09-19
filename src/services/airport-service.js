

const { StatusCodes } = require('http-status-codes');
const { AirportRepository } = require('../repositories');
const { AppError } = require('../utils/errors');

let airportRepository = new AirportRepository();

async function createAirport(data){

    try{
        let airport = await airportRepository.create(data);
        
        return airport;
    }catch(error){

        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot create a new Airport object.', StatusCodes.INTERNAL_SERVER_ERROR);


    }

}

async function getAirports(){

    try{
        let airports = await airportRepository.getAll();
        return airports;
    }catch(error){


        if(error.statusCodes == StatusCodes.BAD_REQUEST){
            throw new AppError('Can not retrieve airports', StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot retrieve Airport objects.', StatusCodes.INTERNAL_SERVER_ERROR);


    }

}

async function getAirport(id){

    try{

        let airport = await airportRepository.get(id);
        return airport;

    }catch(error){

        if(error.statusCodes == StatusCodes.BAD_REQUEST){
            throw new AppError('Can not retrieve airport', StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot retrieve Airport object.', StatusCodes.INTERNAL_SERVER_ERROR);

    }

}

async function destroyAirport(id){

    try{

        let airport = await airportRepository.destroy(id);
        return airport;

    }catch(error){

        if(error.statusCodes == StatusCodes.BAD_REQUEST){
            throw new AppError('Can not destroy airport', StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Can not destroy object.', StatusCodes.INTERNAL_SERVER_ERROR);

    }

}

async function updateAirport(id, data){

    try{

        let airport = await airportRepository.update(id, data);
        return airport;

    }catch(error){

        if(error.statusCodes == StatusCodes.BAD_REQUEST){
            throw new AppError('Can not update airport', StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Can not update object.', StatusCodes.INTERNAL_SERVER_ERROR);

    }

}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport

}



