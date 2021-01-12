import models from "../database/models/index.js";
import "regenerator-runtime/runtime";

const { Booking,Accommodations,Users,Rooms} = models;
console.log(Booking)
/**
 * @description This service deals with the Booking model
 */
export default class BookingServices {
/**
   * @description this service create a new booking in the db
   * @param {object} booking
   * @return {object} return the created booking
   */
  static async createBooking(accomId,tripId) {
    
  }
  static async allBooking() {
    const data = await Booking.findAll({
    //     where: { user_id: userId },
        include: [
        // { model: Users},
          { model: Accommodations},
        //   { model: Rooms}
        ],
    })
    const bookings = await Booking.findAll()
    console.log(bookings)
    
    return bookings;
     
}
static async bookingsById(bookid) {
    // const data = await Booking.findOne({
        // where: { bookid, userId: user_id },
    //     include: [
    //       { model: Accommodations, as: 'accommodation' },
    //       { model: Rooms, as: 'room' }
    //     ]
    //   });
    const data = await Booking.findOne({
        where: {"id": bookid}
    })

console.log(data)
    return data 
    
}

}