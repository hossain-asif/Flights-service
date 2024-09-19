

const express = require('express');
const { AirportController } = require('../../controllers');
const { AirportMiddleware } = require('../../middlewares');

const router = express.Router();



// /api/v1/airport POST
router.post('/',
    AirportMiddleware.validateCreateRequest,
    AirportController.createAirport);


// /api/v1/airport GET
router.get('/',
    AirportController.getAirports);


// /api/v1/airport GET
router.get('/:id',
    AirportController.getAirport);


// /api/v1/airport DELETE
router.delete('/:id',
    AirportController.destroyAirport);


// /api/v1/airport PATCH
router.patch('/:id',
    AirportController.updateAirport);


module.exports = router;

