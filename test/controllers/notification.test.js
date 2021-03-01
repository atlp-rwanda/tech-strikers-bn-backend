import chai from "chai";
import { async } from "regenerator-runtime";
import server from "../../src";
import NotificationServices from "../../src/services/notification.service";
import sendNotificationEmail from "../../src/utils/email";
import statusToggle from "../../src/utils/statusToggle";
import notificationMock from "../data/notification.mock";
import userMock from "../data/user.mock";

const { expect } = chai;
const apiVersion = process.env.API_VERSION;
const { user3 } = userMock;
const {
  notificationResponse,
  notificationData,
  emailNotification,
} = notificationMock;
const { targetUrl, subject, content } = emailNotification;
const { sendNotification } = sendNotificationEmail;

describe("NOTIFICATION TESTS", () => {
  it("should save notification in the database", (done) => {
    NotificationServices.createNotification(notificationData).then(
      ({ dataValues }) => {
        expect(dataValues).to.be.an("object");
        expect(dataValues).to.haveOwnProperty("id");
        expect(dataValues).to.haveOwnProperty("title");
        expect(dataValues).to.haveOwnProperty("content");
        expect(dataValues).to.haveOwnProperty("userId");
        expect(dataValues).to.haveOwnProperty("seen");
      }
    );
    done();
  });

  it("should get all notifications in the database", (done) => {
    chai
      .request(server)
      .get(`/api/${apiVersion}/notifications`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body)
          .to.haveOwnProperty("message")
          .eql("All notifications retrieved");
        done(err);
      });
  });

  it("should get one notification in the database", (done) => {
    chai
      .request(server)
      .get(`/api/${apiVersion}/notifications/1`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.haveOwnProperty("message")
          .eql("Notification retrieved");
        done(err);
      });
  });

  it("should return error if notification doesn't exist", (done) => {
    chai
      .request(server)
      .get(`/api/${apiVersion}/notifications/-1`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body)
          .to.haveOwnProperty("error")
          .eql("Notification not found");
        done(err);
      });
  });

  it("send a notification via email", (done) => {
    sendNotification(user3, targetUrl, subject, content);
    done();
  });

  it("should change notification status", (done) => {
    statusToggle(notificationData.id);
    done();
  });
});
