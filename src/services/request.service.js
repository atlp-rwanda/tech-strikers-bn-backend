import models from "../database/models/index";
import "regenerator-runtime/runtime";

const { TripRequest, Trips, Users } = models;
/**
 * @description This service deals with the Requests model
 */
export default class RequestServices {
/**
   * @description this service create a new user in the db
   * @param {object} request
   * @return {object} return the created user
   */
  static async createRequest(request) {
    const requests = await TripRequest.create(request);
    return requests;
  }

  /**
   * @description this service create a new user in the db
   * @param {object} trip
   * @return {object} return the created user
   */
  static async createTrip(trip) {
    const trips = await Trips.create(trip);
    return trips;
  }

  /**
   * @description this service create a new user in the db
   * @param {object} tripId
   * @return {object} return the created user
   */
  static async getAllTripRequest(tripId) {
    const trip = await Trips.findOne({ where: { id: tripId },
      include: [
        {
          model: TripRequest
        }
      ] });
    return trip;
  }

  /**
   * @description this service create a new user in the db
   * @param {object} requestId
   * @return {object} return the created user
   */
  static async getAllRequest(requestId) {
    const requests = await TripRequest.findOne({ where: { id: requestId },
      include: [
        {
          model: Users
        }
      ] });
    return requests;
  }
}
