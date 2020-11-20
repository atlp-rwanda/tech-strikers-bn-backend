import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/index";

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

describe("i18n API", () => {
  it("should translate in english", (done) => {
    chai
      .request(server)
      .get("/home")
      .set("Accept-Language","en")
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Welcome to Barefoot Nomad");
        done();
      });
  });
  it("should translate in french", (done) => {
    chai
      .request(server)
      .get("/home")
      .set("Accept-Language","fr")
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Bienvenue sur Barefoot Nomad");
        done();
      });
  });
  it("should translate in kiny", (done) => {
    chai
      .request(server)
      .get("/home")
      .set("Accept-Language","ki")
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Murakaza neza kuri Barefoot Nomad");
        done();
      });
  });
})
