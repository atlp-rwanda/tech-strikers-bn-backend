import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import userMock from "../data/user.mock";
import statusCode from "../../src/utils/statusCode";
import customMessage from "../../src/utils/customMessage";
import tokenUtil from "../../src/utils/util.jwt";
import dotenv from "dotenv";
dotenv.config();

import token from "../logout/data/token.data";

chai.use(chaiHttp);
chai.should();

const email = {
  fullname: "user",
  email: 1,
  password: "characters",
  username: "geraud",
};
const { user1, user2, user3, user4, user0 } = userMock;
const { created, ok, conflict, badRequest } = statusCode;
const { signedup, duplicateEmail } = customMessage;
const { generateToken } = tokenUtil;

describe("User Test", () => {
  it("Should create a user", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/signup")
      .send(user1)
      .end((err, res) => {
        const { data, message, token } = res.body;
        expect(res.status).to.equal(created);
        expect(data);
        expect(message);
        expect(message).to.equal(signedup);
        expect(data).to.a("object");
        expect(token).to.a("string");
        done();
      });
  });
  it("Should create another a user", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/signup")
      .send(user2)
      .end((err, res) => {
        const { data, message, token } = res.body;
        expect(res.status).to.equal(created);
        expect(data);
        expect(message);
        expect(message).to.equal(signedup);
        expect(data).to.a("object");
        expect(token).to.a("string");
        done();
      });
  });
  it("Should not create a user with an Existing Email", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/signup")
      .send(user1)
      .end((err, res) => {
        console.log(res.body);
        const { error } = res.body;
        expect(res.status).to.equal(conflict);
        expect(error);
        expect(error).to.equal(duplicateEmail);
        done();
      });
  });

  it("Should update User", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/signup")
      .send(user1)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(conflict);
        expect(error);
        expect(error).to.equal(duplicateEmail);
        done();
      });
  });
  it("Should not update User if username is taken", (done) => {
    chai
      .request(server)
      .put("/api/v1/user")
      .set("Authorization", `Bearer ${generateToken(user3).token}`)
      .field("fullname", "user two")
      .field("username", "user2")
      .field("password", "first_password")
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a("object");
        expect(res.body.error).to.equal("Username has been taken");
        done();
      });
  });
  it("should not update a user if id = 0", (done) => {
    chai
      .request(server)
      .put("/api/v1/user")
      .set("Authorization", `Bearer ${generateToken(user0).token}`)
      .field("fullname", "user one")
      .field("password", "first_password")
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal("Updating failed, try again later.");
        done();
      });
  });
  it("Should update User", (done) => {
    chai
      .request(server)
      .put("/api/v1/user")

      .set("Authorization", `Bearer ${generateToken(user4).token}`)
      .field("username", "user two")
      .field("email", "you@example.com")
      .field("fullname", "user name")
      // for  attach, to test uploading profile picture replace the image path with any image on your local machine

      //.attach("profilePicture", path.resolve(__dirname, "C:/Users/herve_/OneDrive/Desktop/update.jpg"))
      .field("password", "first_password")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });
  it("Should get a user by id", (done) => {
    chai
      .request(server)
      .get("/api/v1/user")
      .set("Authorization", `Bearer ${generateToken(user3).token}`)
      .end((err, res) => {
        expect(res.status).to.equal(ok);
        expect(res.body).to.be.a("object");
        done();
      });
  });
  it("Should not get a user when id = 0", (done) => {
    chai
      .request(server)
      .get("/api/v1/user")
      .set("Authorization", `Bearer ${generateToken(user0).token}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal("User not found");
        done();
      });
  });
});
