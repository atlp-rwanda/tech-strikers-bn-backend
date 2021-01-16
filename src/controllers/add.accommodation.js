import models from "../database/models/index"
const { Accommodation, Rooms } = models
import helper from "../utils/helpers";
import CloudinaryUtils from "../utils/cloudinary";
const { uploadAccommodationPic } = CloudinaryUtils 
const { base64FileStringGenerator } = helper;
class CrudAccommodation {
    static async createAccommodation (req, res){
        const accommodationFormData = JSON.parse(JSON.stringify(req.body));
        if (req.file) {
          const accommodationImage = await uploadAccommodationPic(base64FileStringGenerator(req).content, "accommodationImages")
          accommodationFormData.photoUrl = accommodationImage.url;
        } 
        
        //create accommodation
         const accommodationInfo = await Accommodation.create(accommodationFormData);
        
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
        .json({ message: res.__("Accommodation with that id doesn't exist") });
    }

    const accommodationUpdateFormData = JSON.parse(JSON.stringify(req.body));
        if (req.file) {
          const accommodationUpdateImage = await uploadAccommodationPic(base64FileStringGenerator(req).content, "accommodationImages")
          accommodationUpdateFormData.photoUrl = accommodationUpdateImage.url;
        } 

       console.log(accommodationUpdateFormData)
 const updatedInfo =  await Accommodation.update(accommodationUpdateFormData,
      {
        where: {
          id
        }
      }
    );
    return res
    .status(200)
    .json({ message: res.__('Accomodation successfully updated')});
  }


}

export default CrudAccommodation;