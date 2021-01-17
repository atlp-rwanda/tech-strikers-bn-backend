import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import customMessage from "../../src/utils/customMessage.js";
import statusCode from "../../src/utils/statusCode.js";
import userMock from "../data/user.mock";
const {noEmailAssociate,passwordReset,passwordMatch,passwordUpdated} = customMessage;
const {ok,notFound,badRequest,serverError} = statusCode;

const { user5, user6,password,password1,password2,password3 } = userMock;


chai.use(chaiHttp);
chai.should();
let token1;
let token2;




describe('user forget the password',()=>{
  it("should send the reset link to the email",done=>{
    chai.request(server).post("/api/v1/auth/forgot_password").send({email:"fofo3@example.com"})
    .end((err,res)=>{
      const {token,message} = res.body;
      token1=token;
      expect(res.status).to.equal(ok);
      expect(message);
      expect(message).to.equal(passwordReset)
      expect(token).to.a("string");
      console.log(token1)
      done()
    });
  }).timeout(30000)

  it("it should not send email if email doesn't not exist",done=>{
    chai.request(server).post("/api/v1/auth/forgot_password").send({email:"tytyne@gmail.com"})
    .end((err,res)=>{
      const{error}=res.body
      expect(error)
      expect(res.status).to.equal(notFound);
      expect(error).to.equal(noEmailAssociate)
      done();
  
    })
    
  })
  it("should be able to reset password",done=>{
    chai.request(server).post(`/api/v1/reset_password/${token1}`)
    .send(password)
    .end((err,res)=>{
      const {message} = res.body;
      expect(res.status).to.equal(ok);
      expect(message);
      expect(message).to.equal(passwordUpdated);
      done()
    })
  })

  it("should not be able to reset password if password do not match",done=>{
    chai.request(server).post(`/api/v1/reset_password/${token1}`)
    .send(password1)
    .end((err,res)=>{
      const{error}=res.body
      expect(error)
      expect(res.status).to.equal(badRequest);
      expect(error).to.equal(passwordMatch)
      done()

    })
  })
  it("should not be able to reset password if there is validation error",done=>{
    chai.request(server).post(`/api/v1/reset_password/${token1}`)
    .send(password2)
    .end((err,res)=>{
      const{error}=res.body
      expect(error)
      expect(res.status).to.equal(badRequest);
      done()

    })
  })

  it("should not be able to reset password if token is incorrect or expired",done=>{
    chai.request(server).post(`/api/v1/reset_password/${token2}`)
    .send(password3)
    .end((err,res)=>{
      const{error}=res.body
      expect(error)
      expect(res.status).to.equal(serverError);
      done()

    })
  })
})
