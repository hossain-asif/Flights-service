

const CrudRepository = require('./crud-repository');
const { City } = require('../models');

class CityRepository extends CrudRepository{
    constructor(City){
        super(City);
    }
}


module.exports = CityRepository;