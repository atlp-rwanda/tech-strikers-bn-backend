

import models from "../database/models/index"
const { TripRequest,Users } = models
  
class pendingRequest{
	
static async getAllPendingRequests (req, res){
  try{
    const availableTripRequests = await TripRequest.findAll({where:{status:"pending"},
      include: Users})
 if(availableTripRequests){
  res.json(availableTripRequests)
 }else{
  res.json({message:"No TripRequests available"})
 }
}catch(err){
  res.json({message:"Something not right!"})
}
 

}

}

export default pendingRequest;