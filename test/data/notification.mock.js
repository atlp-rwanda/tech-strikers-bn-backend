export default {
  notificationData: {
    id: 1,
    title: "REQUEST EDITED",
    content: "A TRIP REQUEST HAS BEEN EDITED",
    userId: 2,
    seen: false,
  },
  emailNotification: {
    targetUrl: "requests/1",
    subject: "Notification: Trip Request edited",
    content:
      `This is to notify you that a trip request has been edited.</p> <p>You can access the updated trip request via <a href=${process.env.APP_URL}/requests/1>${process.env.APP_URL}/requests/1`,
  },
  notificationResponse: {
    id: 1,
    title: "testing1",
    content: "contenting2",
    seen: false,
    userId: 1,
    createdAt: "2020-12-14T21:59:15.145Z",
    updatedAt: "2020-12-14T21:59:15.145Z",
    user: {
      id: 1,
      fullname: "Jon DOE",
      email: "manzichris20@gmail.com",
      username: "",
      password: null,
      role: "user",
      provider: "google",
      createdAt: "2020-12-14T21:53:37.880Z",
      updatedAt: "2020-12-14T21:53:37.880Z",
    },
  },
};
