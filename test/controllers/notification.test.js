import chai from "chai";
import NotificationServices from "../../src/services/notification.service";
import emailUtil from "../../src/utils/email";
import notificationMock from "../data/notification.mock";
import tripMock from "../data/trip.mock";
import userMock from "../data/user.mock";

const { expect } = chai;
const { sendNotificationEmailToManagerOnEdit } = emailUtil;
const { user3 } = userMock;
const { trip } = tripMock;
const { notification } = notificationMock;

describe("NOTIFICATION TESTS", () => {
  it("should save notification in the database", (done) => {
    NotificationServices.createNotification(notification).then(
      ({ dataValues }) => {
        expect(dataValues).to.be.an("object");
        expect(dataValues).to.haveOwnProperty("id");
        expect(dataValues).to.haveOwnProperty("title");
        expect(dataValues).to.haveOwnProperty("content");
        expect(dataValues).to.haveOwnProperty("userID");
        expect(dataValues).to.haveOwnProperty("status");
      }
    );
    done();
  });
  it("send a notification email to the manager", async (done) => {
    await sendNotificationEmailToManagerOnEdit(user3, trip);
    done();
  });
});
