import BookingService from "../services/booking.service";

const{findAllBookings,findBookingById}=BookingService

export default class bookingClass{

    static async bookingById(req,res){
        const id=req.body;
        const booking=await findBookingById(id)
        if(!booking){
            return res.status(400).json("booking is not available")
        }
        return res.status(200).json(booking)

    }

    static async bookingAll(req,res){
        const bookings = await findAllBookings()
        if(bookings.length===0)
        {
            return res.status(400).json("there is no bookings")
        }

    return res.status(200).json(bookings)

    }


}


