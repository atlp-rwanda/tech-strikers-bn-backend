import BookingService from "../services/book.service";
import models from "../database/models/index.js";
import "regenerator-runtime/runtime";

const { Booking, Accommodations, Users, Rooms, Trips,TripRequest } = models;


const { bookingsById, allBooking } = BookingService;


export default class BookingController {

    static async bookingById(req, res,next) {

      
        const { id } = req.params;
        const bookings = await bookingsById(id)
        if (bookings.length === 0) {
            return res.status(400).json({ message: "no bookings" })
        }
        if (!bookings) {
            return res.status(400).json({ message: "no booking with that id" })

        }

        return res.status(200).json(bookings)
    }

    static async allBookings(req, res) {

        const bookings = await allBooking()
        if (bookings.length === 0) {
            return res.status(400).json({ message: "no bookings" })
        }

        return res.status(200).json(bookings)
    }

    static async createBooking(req, res,next) {
        try{
        
            let { checkin, checkout, tripid, accommodationid, roomid } = req.body
    
            let CurrentDate = new Date()
            checkin = new Date(checkin);
            checkout = new Date(checkout);
    
            if (checkin < CurrentDate) {
                return res.status(400).json({ message: "The checkin date is before today " })
            }
            else
                if (checkout < CurrentDate) {
                    return res.status(400).json({ message: "The checkout date is before today " })
                }
            if (Date.parse(checkout) < Date.parse(checkin)) {
                return res.status(400).json({ message: "The checkin date is before checkout date" })
            }
            else {
                const trip = await Trips.findOne({ where: { id: tripid },include:TripRequest })
                const checkUser=trip.dataValues.TripRequest.dataValues.userId
                if(!(checkUser === req.user.id)) return res.status(400).json({message:"you can not book the accommodation"})
                const accommodation = await Accommodations.findOne({ where: { id: accommodationid } })
                const room = await Rooms.findOne({ where: { id: roomid } })
    
                if ((!trip || !accommodation) && !room) return res.status(400).json({ message: "either accommodation,room or trip do  not exist" })
                if (room.booked === true) return res.status(400).json({ message: "The room is already booked,choose another one" })
                if(!(room.accommodationId===accommodation.id))  return res.status(400).json({message:"the room doesn't include in that accommodation"})
    
                const bookings = await Booking.create({
                    userId: req.user.id,
                    tripId: trip.id,
                    accommodationId: accommodation.id,
                    roomId: room.id,
                    checkin: checkin,
                    checkout: checkout
                })
    
                const roomUpdate = await Rooms.update({ booked: true }, { where: { id: room.id }, returning: true })
              
                return res.status(200).json({message:"The booking has been made successfully",bookings })
            }
            
        }
        catch(err){
            return next(new Error(err))
        }

       
    }



}