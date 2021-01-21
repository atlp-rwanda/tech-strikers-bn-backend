import models from "../../src/database/models";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import roleMock from "../data/role.mock";
import statusCode from "../../src/utils/statusCode";
import customMessage from "../../src/utils/customMessage";
import dotenv from "dotenv";

dotenv.config();
chai.use(chaiHttp);
chai.should();

const { userRoles } = models;
const { created, ok, conflict, notFound, forbidden, unAuthorized } = statusCode;
const { signedup, duplicateEmail } = customMessage;
let adminToken;
const { superAdmin, simpleUser } = roleMock;

describe("Role setting Tests", () => {
  it("Should create a user", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/signup")
      .send(simpleUser)
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

  it("SuperAdmin role should be created", (done) => {
    const createAdminRole = async () => {
      const role = {
        name: "SUPER_ADMIN",
        description:
          "This is the super Admin or IT staff responsible for assigning roles to other users",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await userRoles.create(role);
    };

    createAdminRole();
    done();
  });

  it("Should create a super Admin", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/signup")
      .send(superAdmin)
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

  it("Should login Super Admin and generate a token", (done) => {
    chai
      .request(server)
      .post("/api/v1/auth/siginIn")
      .send({ email: "admin@gmail.com", password: "superAdmin" })
      .end((err, res) => {
        const { token } = res.body;
        adminToken = token;
        expect(token).to.a("string");
        done();
      });
  });

  it("Super Admin should be able to create role in the system", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/createRole")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Travel administrator",
        description: "This for administrating travals",
      })
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(created);
        expect(res.body).to.a("object");
        expect(message);
        expect(message).to.equal("Role is created in the system");
        done();
      });
  });

  it("Super Admin should be able to assign role to existing user with his email", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/assignRole")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ email: "ntirandth@gmail.com", userRole: "Travel administrator" })
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(ok);
        expect(res.body).to.a("object");
        expect(message);
        expect(message).to.equal("role is successfully assigned");
        done();
      });
  });

  it("Super Admin should be able to get all roles available in the system", (done) => {
    chai
      .request(server)
      .get("/api/v1/user/getRoles")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(ok);
        expect(res.body).to.a("object");
        done();
      });
  });

  it("Super Admin should be able to get one specific role available in the system using its id as param", (done) => {
    chai
      .request(server)
      .get("/api/v1/user/getRole/2")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(ok);
        expect(res.body).to.a("object");
        done();
      });
  });

  it("Super Admin should to update role available in the system using its id", (done) => {
    chai
      .request(server)
      .patch("/api/v1/user/updateRole/2")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Travel administrator (updated)",
        description: "This for administrating travals",
      })
      .end((err, res) => {
        expect(res.status).to.equal(ok);
        expect(res.body).to.a("object");
        done();
      });
  });

  it("Super Admin should not be able to assign role to email which doesn't exist", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/assignRole")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ email: "ndi3kdkk@gmail.com", userRole: "Travel administrator" })
      .end((err, res) => {
        expect(res.status).to.equal(notFound);
        expect(res.body).to.a("object");
        done();
      });
  });

  it("Super Admin should not be able to assign role which doesn't exist", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/assignRole")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ email: "ntirandth@gmail.com", userRole: "priest" })
      .end((err, res) => {
        expect(res.status).to.equal(notFound);
        expect(res.body).to.a("object");
        done();
      });
  });

  it("SUPER_ADMIN role should not be updated", (done) => {
    chai
      .request(server)
      .patch("/api/v1/user/updateRole/3")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "SUPER_ADMIN (updated )",
        description:
          "This is the super Admin or IT staff responsible for assigning roles to other users(updated)",
      })
      .end((err, res) => {
        expect(res.status).to.equal(forbidden);
        expect(res.body).to.a("object");
        done();
      });
  });

  it("Should not assign role without Super admin token passed in the headers, or wrong token", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/assignRole")
      .set("Authorization", `Bearer kdkdkkjkdkdkdkdkdk`)
      .send({ email: "ntirandth@gmail.com", userRole: "Travel administrator" })
      .end((err, res) => {
        expect(res.status).to.equal(unAuthorized);
        expect(res.body).to.a("object");
        done();
      });
  });

  it("SUPER_ADMIN role should not be a deleted", (done) => {
    chai
      .request(server)
      .delete("/api/v1/user/deleteRole/3")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(forbidden);
        expect(res.body).to.a("object");
        done();
      });
  });

  it("Super Admin should be able to delete one specific role available in the system using its id as param", (done) => {
    chai
      .request(server)
      .delete("/api/v1/user/deleteRole/2")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(ok);
        expect(res.body).to.a("object");
        done();
      });
  });
});
