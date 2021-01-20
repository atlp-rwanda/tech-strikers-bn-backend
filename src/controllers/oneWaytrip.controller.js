/* eslint-disable require-jsdoc */

import tripService from "../services/oneWayTrip.service.js";
import validationSchema from "../validation/onewaytrip.request.validations";
import validationUtils from "../utils/util.trip.validation";
import getResponse from "../utils/oneWayTripRequestResponses/response";

const { saveRequest, getRequests, deleteRequest, updateRequest } = tripService;
const {
  getResponseOnCreate,
  getResponseOnGet,
  getResponseOnUpdate,
  getResponseOnDelete,
  getResponseOnValidation,
} = getResponse;
const { validation } = validationUtils;

/**
 * @description This controller deals with the oneWayTrip model
 */
export default class TripControllers {
  /**
   * @description this controller retrieve all requests from database
   * @param {object} req request
   * @param {object} res response
   * @return {object} returns json object with signup message
   */

  static async getAllOneWayTripRequest(req, res) {
    const trip = await getRequests();
    getResponseOnGet(res, trip);
  }
  /**
   * @description this controller saves a request in database
   * @param {object} req request
   * @param {object} res response
   * @return {object} returns json object with signup message
   */

  static async createOneWayTripRequest(req, res) {
    const {
        departureDate,
        originId,
        destinationId,
        reason,
        tripType,
      } = req.body,
      tripDetails = {
        originId,
        destinationId,
      },
      tripRequestDetails = {
        userId: req.user.id,
        tripType,
        departureDate,
        reason,
      };

    const valid = validation(req.body, validationSchema);
    getResponseOnValidation(res, valid);
    const trip = await saveRequest(tripDetails, tripRequestDetails);

    return getResponseOnCreate(res, trip);
  }
  /**
   * @description this controller update a request in database
   * @param {object} req request
   * @param {object} res response
   * @return {object} returns json object with signup message
   */

  static async updateOneWayTripRequest(req, res) {
    const tripRequestDetails = req.body;
    const valid = validation(tripRequestDetails, validationSchema);
    console.log(valid);
    getResponseOnValidation(res, valid);
    const trip = await updateRequest(tripRequestDetails, req.params.id);

    return getResponseOnUpdate(res, trip);
  }
  /**
   * @description this controller delete a request in database
   * @param {object} req request
   * @param {object} res response
   * @return {object} returns json object with signup message
   */

  static async deleteOneWayTripRequest(req, res) {
    const trip = await deleteRequest(req.params.id);
    return getResponseOnDelete(res, trip);
  }
}
