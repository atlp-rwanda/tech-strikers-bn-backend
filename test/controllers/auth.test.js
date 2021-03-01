import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { async } from "regenerator-runtime";
import AuthControllers from "../../src/controllers/auth.controller";
import server from "../../src/index";
import AuthServices from "../../src/services/auth.service";
import userMock from "../data/user.mock";

chai.use(chaiHttp);

const apiVersion = process.env.API_VERSION;

const { user1 } = userMock;

const googleURL = `/api/${apiVersion}/user/login/google`;
const facebookURL = `/api/${apiVersion}/user/login/facebook`;

describe("SOCIAL MEDIA AUTH ROUTES", () => {
  it("should redirect to google", (done) => {
    chai
      .request(server)
      .get(googleURL)
      .end((err, res) => {
        expect(res).to.have.status(200);

        expect(res.redirects[0]).to.contain(
          "https://accounts.google.com/o/oauth2/v2/auth?response"
        );
        done(err);
      });
  });

  it("should redirect to facebook", (done) => {
    chai
      .request(server)
      .get(facebookURL)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.redirects[0]).to.contain(
          "https://www.facebook.com/v3.2/dialog/oauth?response_type=code&redirect"
        );
        done(err);
      });
  });
});
