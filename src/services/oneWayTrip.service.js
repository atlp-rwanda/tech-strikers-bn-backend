import models from "../database/models/index";

const { Users, Trips, TripRequest } = models;

/**
 * @description This service deals with the oneWayTrip model
 */
export default class TripServices {
  /**
   * @description this service save a trip request in the database
   * @param {object} tripRequest
   *  @param {object} tripRequestDetails
   * @return {object} return the message
   */
  static async saveRequest(tripData, tripRequestDetails) {
    try {
      const result = await TripRequest.create(tripRequestDetails);
      tripData.tripRequestId = result.id;
      const trip = await Trips.create(tripData);
      trip.result = result;
      return trip;
    } catch (err) {
      return err;
    }
  }

  /**
   * @description this service save a trip request in the database
   * @return {object} return the message
   */
  static async getRequests() {
    const requests = await TripRequest.findAll({
      include: Trips,
      include: Users,
    });
    return requests;
  }

  /**
   * @description this service save a trip request in the database
   *  @param {object} id
   * @return {object} return the message
   */
  static async getRequestById(id) {
    const retrievedRequest = await TripRequest.findByPk(id, { include: Trips });
    return retrievedRequest;
  }

  /**
   * @description this service save a trip request in the database
   *  @param {object} id
   * @return {object} return the message
   */
  static async deleteRequest(id) {
    return await TripRequest.destroy({
      where: { id },
    });
  }

  /**
   * @description this service save a trip request in the database
   *  @param {object} data
   * @param {object} id
   * @return {object} return the message
   */
  static async updateRequest(data, id) {
    const PendingStatusCheck = await TripRequest.findAll({ where: { id } });
    if (PendingStatusCheck.length == 0) {
      return "no request";
    } else if (PendingStatusCheck[0].status === "pending") {
      const updateResponse = await TripRequest.update(data, { where: { id } });
      return updateResponse;
    } else {
      return "can't update";
    }
  }
}
