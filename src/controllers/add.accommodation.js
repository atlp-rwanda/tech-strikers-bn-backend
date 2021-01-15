import models from "../database/models/index"
const { Accommodation, Rooms } = models

class CrudAccommodation {
    static async addAccommodation (req, res){
const { 
    accommodationType,
    accommodationName,
    location,
    description,
    facilities,
    photoUrl,
    } = req.body

//create accommodation
    const accommodationInfo = await Accommodation.create({
    accommodationType,
    accommodationName,
    location,
    description,
    facilities,
    photoUrl,
    });

return res.status(201).json({
    message: res.__("Accommodation created successfully"),
     accommodationInfo,
})
    
}

static async GetAllAccommodations (req, res){
 const availableAccommodations = await Accommodation.findAll({
     include: [
         {
             model: Rooms
         }
     ]
 })
if(availableAccommodations.length === 0){
    return res.status(404)
    .json({
        message: res.__("No available accommodations")
    })
}
 return res.status(200)
 .json({
    availableAccommodations
 })
}
static async deleteAccommodation(req,res){
    const { id } = req.params;
    const deletedAccoommodation = await Accommodation.destroy({
      where: { id }
    });
    if (!deletedAccoommodation) {
      return res
        .status(404)
        .json({ message: res.__(`The accommodation with that id doesn't exist`) });
    }
    return res
      .status(200)
      .json({ message: res.__("Accommodation deleted successfully") });
}

static async updateAccommodation (req, res) {
    const { id } = req.params;
    const accomodationExist = await Accommodation.findByPk(id);
    if (!accomodationExist) {
      return res
        .status(404)
        .json({ message: res.__("The accommodation with that id doesn't exist") });
    }
    await Accommodation.update(
      {
        accommodationType: req.body.accommodationType || accomodationExist.accommodationType,
        accommodationName: req.body.accommodationName || accomodationExist.accommodationName,
        description: req.body.description || accomodationExist.description,
        photoUrl: req.body.photoUrl || accomodationExist.photoUrl,
        facilities: req.body.facilities || accomodationExist.facilities,
        location: req.body.location || accomodationExist.location
        
      },
      {
        where: {
          id
        }
      }
    );

    return res
    .status(200)
    .json({ message: res.__('Accomodation successfully updated') });
  }


}

export default CrudAccommodation;