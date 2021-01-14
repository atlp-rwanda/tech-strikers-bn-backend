import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import userMock from "../data/user.mock";
import path from "path"
import statusCode from "../../src/utils/statusCode";
import customMessage from "../../src/utils/customMessage";
import {jwtToken} from "../../src/utils/token.utils"
import dotenv from "dotenv";
dotenv.config();


chai.use(chaiHttp);
chai.should();
let  token1;
let token2;


const email = { email: 1 };
const { user1,user2, user5,user3,user4,user0 } = userMock;
const { created, ok, conflict,badRequest} = statusCode;
const{ signedup,duplicateEmail,accountVerified,emailAssociate,resend } = customMessage;

describe("User Test", () => {
  it("Should create a user", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/signup")
      .send(user1)
      .end((err, res) => {
        const { data, message, token } = res.body;
        token1=token;
        expect(res.status).to.equal(created);
        expect(data);
        expect(message);
        expect(message).to.equal(signedup);
        expect(data).to.a("object");
        expect(token).to.a("string");
        console.log(token)
        console.log(token1)
        done();
      });
  }).timeout(1000);;

  it("should be able to confirm a user",done=>{
    chai.request(server).post(`/api/v1/user/confirmation/${token1}`)
    .end((err,res)=>{
      const {message} = res.body;
      expect(res.status).to.equal(ok);
      expect(message);
      expect(message).to.equal(accountVerified);
      done()
    })
  }).timeout(1000);

  it("should be able to resend confirmation email",done=>{
    chai.request(server).post(`/api/v1/user/resend`)
      .send({email: "dusaflora2@gmail.com"})
    .end((err,res)=>{
      const { data, message, token } = res.body;
      expect(res.status).to.equal(ok);
      expect(message);
      expect(message).to.equal(resend);
      expect(token).to.a("string");
      done()
    })
  });
  it("should not be able to resend confirmation email",done=>{
    chai.request(server).post(`/api/v1/user/resend`)
      .send({email: "fofo3@example.com"})
    .end((err,res)=>{
      const { data, message, token } = res.body;
      expect(res.status).to.equal(badRequest);
      expect(message);
      expect(message).to.equal(emailAssociate);
      expect(token).to.a("string");
      done()
    })
  })


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
  
  it("Should not update User if username is taken", (done) => {
    chai
      .request(server)
      .put("/api/v1/user")
      .set("Authorization", `Bearer ${jwtToken.createToken(user3).token}`)
      .field("fullname", "user")
      .field("username", "user2")
      .field("email", "you@example.com")
      .field("password", "first_password")
      .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("Username has been taken");
          done();
        });
  });
  it("should not update a user if id = 0", (done) => {
    chai
      .request(server)
      .put("/api/v1/user")
      .set("Authorization", `Bearer ${jwtToken.createToken(user0).token}`)
      .field("fullname", "user one")
      .field("password", "first_password")
      .end((err, res) => {
        expect(res.status).to.equal(400)
        expect(res.body.message).to.equal("Updating failed, try again later.")
        done();
      })
  });
  it("Should update User", (done) => {
    chai
      .request(server)
      .put("/api/v1/user")
      .set("Authorization", `Bearer ${jwtToken.createToken(user4).token}`)
      .field("fullname", "username")
      .field("username", "user two")
      .field("email", "you@example.com")
      // for  attach, to test uploading profile picture replace the image path with any image on your local machine

      .attach("profilePicture", path.resolve(__dirname, "C:/Users/herve_/OneDrive/Desktop/update.jpg"))
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
      .set("Authorization", `Bearer ${jwtToken.createToken(user3).token}`)
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
      .set("Authorization", `Bearer ${jwtToken.createToken(user0).token}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal("User not found");
        done();
     });
   });
});

