
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

module.exports = router;
