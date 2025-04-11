const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { AppError } = require("../utils/errors");
const { Op } = require("sequelize");




let flightRepository = new FlightRepository();

async function createFlight(data){
    try {

        let flight = await flightRepository.create(data);
        return flight;

    } catch (error) {
        
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.array.forEach((err) => {
                explanation.push(err.name);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError('can not create new flight object.', StatusCodes.INTERNAL_SERVER_ERROR);

    }
}



async function getAllFlights(query){
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";

    //trips
    if(query.trips){
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        if(departureAirportId == arrivalAirportId){
            throw new AppError('Departure airport and arrival airport can not be same.', StatusCodes.BAD_REQUEST);
        }
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    //price
    if(query.price){
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice==undefined)?20000:maxPrice)]
        };
    }


    //travellers
    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        };
    }


    //tripDate
    if(query.tripDate) {
        // console.log(query.tripDate + endingTripTime);
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        };
    }

    //sort
    if(query.sort){
        const params = query.sort.split('.');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters;
    }

    // console.log(customFilter, sortFilter); 

    try{
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    }catch(error){
        throw new AppError('cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }

}




async function getFlight(id){
    try{

        let flight = await flightRepository.get(id);
        return flight;

    }catch(error){

        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }

        throw('Can not retrieve requested flight.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function updateSeats(data){
    
    try{
        const response = flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    }catch(error){
        throw('Can not update data of the flight.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}




module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}