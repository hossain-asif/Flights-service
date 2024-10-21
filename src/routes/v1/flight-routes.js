
const express = require('express');
const {FlightController} = require('../../controllers');
const {FlightMiddleware} = require('../../middlewares');

const router = express.Router();


// /api/v1/flight/ POST
router.post('/',
    FlightMiddleware.validateCreateRequest,
    FlightController.createFlight
);


// /api/v1/flight/ GET
router.get('/',
    FlightController.getAllFlights
);


// /api/v1/flight/ GET
router.get('/:id',
    FlightController.getFlight
);


// /api/v1/flight/ PATCH
router.patch('/:id/seats',
    FlightMiddleware.validateUpdateSeatsRequest,
    FlightController.updateSeats
);


module.exports = router;
