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
   * @return {object} created notification
   */
  static async createNotification(notificationData) {
    try {
      return await Notifications.create(notificationData);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Gets notifications
   * @return {object} all notifications
   */
  static async getAll() {
    try {
      return await Notifications.findAll({ order: [["createdAt", "DESC"]] });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Gets notification
   * @param {object} notificationID
   * @return {object} one notification
   */
  static async getOne(notificationID) {
    try {
      return await Notifications.findOne({ where: { id: notificationID } });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Allow/Refuse notification
   * @param {object} notificationID
   * @return {object} updated notification
   */
  static async toogleStatus(notificationID) {
    try {
      return await Notifications.update(
        { seen: true },
        {
          where: { id: notificationID },
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
