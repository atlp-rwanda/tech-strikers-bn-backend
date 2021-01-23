import models from "../database/models/index.js";

const { Trips } = models;

export default class tripService {
    static async createTrip (tripData) {
        return await Trips.create(tripData);
    }

}
