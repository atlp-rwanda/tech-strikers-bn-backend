import models from "../database/models/index.js";
import "regenerator-runtime/runtime";
const { Booking, Accommodation, Room } = models;


class bookingService{

    static async findAllBookings(userId){
        const bookings = await Booking.findAll({
            where: { user_id: userId },})
        return bookings; 

    }
    static async findBookingById(value){
        
    const booking= await Booking.findOne({ where: { id: value } });

    return booking;
    }


}