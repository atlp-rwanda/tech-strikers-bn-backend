import NotificationServices from "../services/notification.service";
import responses from "../utils/responses";
import statusToggle from "../utils/statusToggle";

const { successResponse, errorResponse } = responses;

/**
 * @class NotificationControllers
 * @classdesc Holds methods for notifications
 */
export default class NotificationControllers {
  /**
   * @description calls getAll service
   * @param {object} req request
   * @param {object} res response
   * @return {object} all notifications
   */
  static async getAllNotification(req, res) {
    try {
      const Notifications = await NotificationServices.getAll();
      successResponse(
        res,
        200,
        null,
        Notifications.length
          ? "All notifications retrieved"
          : "No notifications yet",
        Notifications
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description calls getOne service
   * @param {object} req request
   * @param {object} res response
   * @return {object} all notifications
   */
  static async getOneNotification(req, res) {
    try {
      const Notification = await NotificationServices.getOne(req.params.id);
      if (Notification) {
        successResponse(res, 200, null, "Notification retrieved", Notification);
        statusToggle(Notification.id);
      }
      errorResponse(res, 404, "Notification not found");
    } catch (error) {
      throw error;
    }
  }
}
