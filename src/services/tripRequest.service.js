import models from "../database/models/index.js";

const { TripRequest } = models;

export default class tripRequestService {
    static async createTripRequest (tripData) {
        const newTripRequest = await TripRequest.create(tripData)
        return newTripRequest.dataValues.id;  
    }

    static async getTripRequestByUserId (id) {
        const response = await TripRequest.findOne({ where: {userId:id}})
        return response;
    }
}
