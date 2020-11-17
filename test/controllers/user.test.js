import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import userMock from "../data/user.mock";
import statusCode from "../../src/utils/statusCode";
import customMessage from "../../src/utils/customMessage";

chai.use(chaiHttp);
chai.should();

const email = { email: 1 };
const { user1, user2 } = userMock;
const { created, ok, conflict } = statusCode;
const { signedup, duplicateEmail } = customMessage;

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
        const { error } = res.body;
        expect(res.status).to.equal(conflict);
        expect(error);
        expect(error).to.equal(duplicateEmail);
        done();
      });
  });
  it("Should user service method when it recieves an id", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/signup")
      .send(email)
      .end((err, res) => {
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
      .put("/api/v1/user")
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal("successfully sent");
        expect(message).to.be.a("string");
        done();
      });
  });
  it("Should Delete User", (done) => {
    chai
      .request(server)
      .delete("/api/v1/user")
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal("successfully sent");
        expect(message).to.be.a("string");
        done();
      });
  });
  it("Should get all User", (done) => {
    chai
      .request(server)
      .get("/api/v1/user")
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal("successfully sent");
        expect(message).to.be.a("string");
        done();
      });
  });
});
