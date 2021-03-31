import models from "../../src/database/models";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";
import server from "../../src/index";
import roleMock from "../data/role.mock";
import statusCode from "../../src/utils/statusCode";
import customMessage from "../../src/utils/customMessage";

dotenv.config();
chai.use(chaiHttp);
chai.should();

const { userRoles } = models;
const { created, ok, conflict, notFound, forbidden, unAuthorized, badRequest } = statusCode;
const { signedup, duplicateEmail } = customMessage;
let adminToken;
let travelAdmin;
const { superAdmin, simpleUser, anotherUser} = roleMock;
describe("Role setting Tests && Accommodations", () => {
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

    it("Super Admin should be able to create Travel Administrator Role in the system", (done) => {
        chai
            .request(server)
            .post("/api/v1/user/createRole")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({  "name": "Travel Administrator", "description": "This for administrating travals"})
            .end((err, res) => {
                const { message } = res.body;
                expect(res.status).to.equal(created);
                expect(res.body).to.a("object");
                expect(message);
                expect(message).to.equal("Role is created in the system");
                done();
            })
            });

it("SUPER_ADMIN role should not be updated", (done) => {
    chai
        .request(server)
        .patch("/api/v1/user/updateRole/3")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({  "name": "SUPER_ADMIN (updated )", "description": "This is the super Admin or IT stuff responsible for assigning roles to other users(updated)"})
        .end((err, res) => {
            expect(res.status).to.equal(forbidden);
            expect(res.body).to.a("object");
            done();
        })
        });

it("Should not assign role without Super admin token passed in the headers, or wrong token", (done) => {
    chai
        .request(server)
        .post("/api/v1/user/assignRole")
        .set("Authorization", `Bearer kdkdkkjkdkdkdkdkdk`)
        .send({  "email": "ntirandth@gmail.com", "userRole": "Travel administrator"})
        .end((err, res) => {
            expect(res.status).to.equal(unAuthorized);
            expect(res.body).to.a("object");
            done();
        })
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
        })
        });


  it("Super Admin should assign someone to be Travel Administrator using existing email", (done) => {
      chai
          .request(server)
          .post("/api/v1/user/assignRole")
          .set("Authorization", `Bearer ${adminToken}`)
          .send({  
              "email": "ntirandth@gmail.com",
              "userRole": "Travel Administrator"
          })
          .end((err, res) => {
              const { message } = res.body;
              expect(res.status).to.equal(ok);
              expect(res.body).to.a("object");
              expect(message);
              expect(message).to.equal("role is successfully assigned");
              done();
          })
          });


      it('Should login Travel administrator and generate a token',(done) => {
          chai
          .request(server)
              .post("/api/v1/auth/siginIn")
              .send({ 
              "email": "ntirandth@gmail.com",
              "password": "kdkdMhe23"
              })
              .end((err,res) => {
              const { token }  = res.body;
              travelAdmin= token;
                  expect(token).to.a ("string")
                  done()
              })
      });       

  it("Travel Administrator be able to create accommodation in the system", (done) => {
      chai
          .request(server)
          .post("/api/v1/createAccommodation")
          .set("Authorization", `Bearer ${travelAdmin}`)
          .send({  "accommodationType": "Hotel", 
          "accommodationName":"Serena hotel",
          "location": "kigali-Rwanda",
          "facilities": "swimming poll_Parking",
          "description":"This the beautiful hotel sls..s.kkkk",
          "photoUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/S"
      })
          .end((err, res) => {
              const { message } = res.body;
              expect(res.status).to.equal(created);
              expect(res.body).to.a("object");
              expect(message);
              expect(message).to.equal("Accommodation created successfully");
              done();
          })
          });

          it("Travel Administrator be able to create a Room in the existing accommodation", (done) => {
            chai
                .request(server)
                .post("/api/v1/accommodation/1/createRoom")
                .set("Authorization", `Bearer ${travelAdmin}`)
                .send({
                "roomType": "Music Room 63",
                "facilities": "Tv show",
                "roomNumber":3,
                "price":"400$"
            })
                .end((err, res) => {
                    const { message } = res.body;
                    expect(res.status).to.equal(created);
                    expect(res.body).to.a("object");
                    expect(message);
                    expect(message).to.equal(`[Music Room 63] is created in [Serena hotel]`);
                    done();
                })
                })

                it("Super Admin should be able to update accommodation available in the system using its id", (done) => {
                  chai
                    .request(server)
                    .put("/api/v1/updateaccommodation/1")
                    .set("Authorization", `Bearer ${travelAdmin}`)
                    .send({  "accommodationType": "Hotel", 
                              "accommodationName":"Serena hotel(updated)",
                              "location": "kigali-Rwanda",
                              "facilities": "swimming poll_Parking",
                              "description":"This the beautiful hotel sls..s.kkkk",
                              "photoUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/S"
                          })
                    .end((err, res) => {
                      const { message } = res.body;
                      expect(res.status).to.equal(ok);
                      expect(res.body).to.a("object");
                      expect(message);
                      expect(message).to.equal("Accomodation successfully updated");
                      done();
                    });
                });

                it("Travel admin should be able to get all accommodations  available in the system", (done) => {
                  chai
                    .request(server)
                    .get("/api/v1/getallaccommodations")
                    .set("Authorization", `Bearer ${travelAdmin}`)
                    .end((err, res) => {
                      expect(res.status).to.equal(ok);
                      expect(res.body).to.a("object");
                      done();
                    });
                });

                it("Travel admin should be able to get all rooom availble in a specific accommodation in the system", (done) => {
                  chai
                    .request(server)
                    .get("/api/v1/accommodation/1/getRooms")
                    .set("Authorization", `Bearer ${travelAdmin}`)
                    .end((err, res) => {
                      expect(res.status).to.equal(ok);
                      expect(res.body).to.a("object");
                      done();
                    });
                });
    


it("Super Admin should be able to delete one specific role available in the system using its id as param", (done) => {
  chai
      .request(server)
      .delete("/api/v1/user/deleteRole/4")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
          expect(res.status).to.equal(ok);
          expect(res.body).to.a("object");
          done();
      })
      });
   
})
