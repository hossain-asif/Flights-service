

const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils/errors');
const { CityRepository } = require('../repositories');
const { ErrorResponse } = require('../utils/response');

let cityRepository = new CityRepository();



async function createCity(data){
    try{

        let city = await cityRepository.create(data);
        return city;

    }catch(error){
        
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.array.forEach((err) => {
                explanation.push(err);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Can not create new city object.', StatusCodes.INTERNAL_SERVER_ERROR);

    }

}

async function getCity(id){
    try{
        let city = await cityRepository.get(id);
        return city;
    }catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("Not able to find the resource.", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Can not retrieved requested city object.", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try{
        let response = await cityRepository.destroy(id);
        return  response;
    }catch(error){

        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError('Not able to find the resource.', StatusCodes.NOT_FOUND);
        }

        throw new AppError('Can not delete requested city object.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function updateCity(id, data){
    try{
        let response = await cityRepository.update(id, data);
        return response;
    }catch(error){
        if(error.status == StatusCodes.NOT_FOUND){
            throw new AppError('Not able to find the resource.', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Can not update requested city object.');
    }
}




module.exports = {
    createCity,
    getCity,
    destroyCity,
    updateCity
}

