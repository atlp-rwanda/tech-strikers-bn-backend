const request = require("supertest");
import server from "../../src/index.js";
const expect = require("chai").expect;
describe("Login API",() => {

    it('Should fail if email is not verified in the database',(done) => {
        request(server)
           .post("/api/v1/auth/siginIn")
           .send({   
            "email": "fofo3@example.com",
            "password": "fofo12345",
        })
           .expect((res) => {
           expect(res.body).to.have.own.property("error");
           })
           .end(done);
    }); 

    it('Should not succeed if password is missing',(done) => {
        request(server)
           .post("/api/v1/auth/siginIn")
           .send({   "email": "evalopb@gmail.com"})
           .expect(400)
           .expect((res) => {
              expect(res.body).to.have.own.property("error");
              expect("error").to.be.a("string", "Password is required");
           })
           .end(done);
    }); 

    it('Should not succeed if email is missing',(done) => {
        request(server)
           .post("/api/v1/auth/siginIn")
           .send({ "password": "M03000jdh"})
           .expect(400)
           .expect((res) => {
              expect(res.body).to.have.own.property("error");
              expect("error").to.be.a("string", "Email is required");
           })
           .end(done);
    }); 

    it('Should not succeed if password is not in the range of 6 and 15 characters',(done) => {
        request(server)
           .post("/api/v1/auth/siginIn")
           .send({ "password": "Mn"})
           .expect(400)
           .expect((res) => {
              expect(res.body).to.have.own.property("error");
              expect("error").to.be.a("string", "Password must be in the range of 6 to 15 characters");
           })
           .end(done);
    }); 


});
