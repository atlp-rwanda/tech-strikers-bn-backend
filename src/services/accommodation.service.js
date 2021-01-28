import models from "../database/models/index";
const { Accommodation } = models;


const getAccommodationByaccommodationName = async (value) =>{
    let accommodation;
    if (typeof value === "string") {
      accommodation = await Accommodation.findOne({ where: { accommodationName: value } });
      return accommodation;
    }         
  }

  export default getAccommodationByaccommodationName