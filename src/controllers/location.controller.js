import models from "../database/models/index"
const { Location } = models
class CrudLocations {
    static async addLocation (req, res){

      const locationDetails={city:req.body.city,country:req.body.country}
      try{
const ceatedLocation = await Location.create(locationDetails);
            if(ceatedLocation){
              res.status(201).json(ceatedLocation)
            }else{
              res.json({message:"Sorry, something went wrong"})
            }
      

      }catch(error){
        res.send(error)
      }
          
    }

static async getAllLocations (req, res){
  try{
    const availableLocations = await Location.findAll()
 if(availableLocations){
  res.json(availableLocations)
 }else{
  res.json({message:"No locations available"})
 }
}catch(err){
  res.json({message:"Something not right!"})
}
 

}
static async removeLocation(req,res){
    const { id } = req.params;
    const removedLocation = await Location.destroy({
      where: { id }
    });
    res.json(removedLocation)
}
}
export default CrudLocations;