import models from "../database/models";

const { Notifications } = models;

/**
 * @class NotificationServices
 * @classdesc Has methods for notification services
 */
export default class NotificationServices {
  /**
   * @description Creates notification in db
   * @param {object} notificationData
   * @returns {object} created notification
   */
  static async createNotification(notificationData) {
    return await Notifications.create(notificationData);
  }
}
