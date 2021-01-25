import models from "../database/models/index.js";

const { Location } = models;

export default class locationsService {
    static async getLocationById (locationId) {
        return await Location.findOne(
            {
                where: {id:locationId}
            }) 
    }
}
