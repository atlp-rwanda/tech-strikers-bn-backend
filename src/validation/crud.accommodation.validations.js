class AccommodationValidation {
    static async createAccommodationValidations (req, res, next){
        const { accommodationType, accommodationName, location, facilities, description, photoUrl} = req.body;
        /*if(!validator.isEmail){
            return res.status(400).send({error: "Incorrect Email"}); 
        } */
        if(!accommodationType){
            return res.status(400).send({error: res.__("Accommodation type is required")});
        }
        
        if(!accommodationName){
            return res.status(400).send({error: res.__("Accommodation name is required")});
        }
    
        if(!location){
            return res.status(400).send({error: res.__("Location is required")});
        }
    
        if(!facilities){
            return res.status(400).send({error: res.__("facilities are required")});
        }
    
        if(!description){
            return res.status(400).send({error: res.__("description is required")});
        }
    
        if(!photoUrl){
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