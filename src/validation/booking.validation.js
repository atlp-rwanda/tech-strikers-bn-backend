
import validator from "validator";

export default async (req, res, next) => {
    const {tripId,roomId,accommodationId,checkin,checkout} = req.body;

    if(!tripId){
        return res.status(400).send({error: res.__("tripId is required")});
    }
    
    if(!roomId){
        return res.status(400).send({error: res.__("roomId is required")});
    }
 
    if(!accommodationId){
        return res.status(400).send({error: res.__("accommodationId is required")});
    }
    if(!checkin){
        return res.status(400).send({error: res.__("checkin is required")});
    }
    
    if(!checkout){
        return res.status(400).send({error: res.__("checkout is required")});
    }

   
    return next();
    }
