class AccommodationValidation {
    static async createAccommodationValidations (req, res, next){
        const accommodationFormData = JSON.parse(JSON.stringify(req.body));
        
        if(!accommodationFormData.accommodationType){
            return res.status(400).send({error: res.__("Accommodation type is required")});
        }
        
        if(!accommodationFormData.accommodationName){
            return res.status(400).send({error: res.__("Accommodation name is required")});
        }
    
        if(!accommodationFormData.location){
            return res.status(400).send({error: res.__("Location is required")});
        }
    
        if(!accommodationFormData.facilities){
            return res.status(400).send({error: res.__("facilities are required")});
        }
    
        if(!accommodationFormData.description){
            return res.status(400).send({error: res.__("description is required")});
        }
    
        if(!accommodationFormData.photoUrl){
            return res.status(400).send({error: res.__("photo url is required")});
        }
    
        return next();
        }


        static async createRoomValidations(req, res, next){
            const { roomType,roomNumber,price } = req.body
            if(!roomType){
                return res.status(400).send({error: res.__("RoomType is required")});
            }
        
            if(!roomNumber){
                return res.status(400).send({error: res.__("RoomNumberare required")});
            }
        
            if(!price){
                return res.status(400).send({error: res.__("Price is required")});
            }
        
            return next();
            }
 }

export default AccommodationValidation