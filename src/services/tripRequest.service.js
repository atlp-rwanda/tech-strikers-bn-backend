import models from "../database/models/index.js";

const { TripRequest, Trips, Users,Locations } = models;

export default class tripRequestService {
    static async findById(modelId) {
        let response;
        response = await TripRequest.findOne({ where: { id: modelId }, include: Trips })
            // .then(data => response = data)
            // .catch(error => {if (error) throw (error)})
         return response;
    }        
    static async createTripRequest (tripData) {
        const newTripRequest = await TripRequest.create(tripData)
        return newTripRequest.dataValues.id;  
    }

    static async getTripRequestByUserId (id) {
        const response = await TripRequest.findAll({
             where: {userId:id},
             include: Trips
            });
        return response;
    }
    
}
