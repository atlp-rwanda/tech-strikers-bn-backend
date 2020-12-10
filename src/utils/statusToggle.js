import NotificationServices from "../services/notification.service";

export default async (notificationID) => {
  try {
    const data = await NotificationServices.toogleStatus(notificationID);
    return data;
  } catch (error) {
    throw error;
  }
};
