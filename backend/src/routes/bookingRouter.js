const express = require('express')
const authMiddleware = require('../middlewares/auth');
const { createBooking, confirmPayment, listBookings, getOccupiedSeats, getBooking, deleteBooking } = require('../controller/bookingController');
const bookingRouter = express.Router();


bookingRouter.post('/', authMiddleware,createBooking);
bookingRouter.get('/confirm-payment',confirmPayment);
bookingRouter.get('/',listBookings);
bookingRouter.get('/occupied',getOccupiedSeats);
bookingRouter.get('/my', authMiddleware,getBooking);
bookingRouter.delete('/:id',deleteBooking);

module.exports = bookingRouter;