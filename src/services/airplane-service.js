

const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const { AppError } = require('../utils/errors');



let airplaneRepository = new AirplaneRepository();


async function createAirplane(data){
    try{

        let airplane = await airplaneRepository.create(data);
        return airplane;

    } catch(error){
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }

}


async function getAirplanes(){
    try{
        let airplanes = await airplaneRepository.getAll();
        return airplanes;
    }catch(error){
        throw new AppError('Can not retrieve airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getAirplane(id){
    try{

        let airplane = await airplaneRepository.get(id);
        return airplane;

    }catch(error){

        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Not able to find the resource', StatusCodes.INTERNAL_SERVER_ERROR);
        }

        throw('Can not retrieve requested airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function destroyAirplane(id){
    try{
        let response = airplaneRepository.destroy(id);
        return response;
    }catch(error){

        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Not able to find the resource', StatusCodes.INTERNAL_SERVER_ERROR);
        }

        throw new AppError('Delete perform fail.', StatusCodes.INTERNAL_SERVER_ERROR);

    }
}


async function updateAirplane(id, data){
    try{

        let response = airplaneRepository.update(id, data);
        return response;

    }catch(error){

        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Update perform fail.',StatusCodes.NOT_FOUND);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}