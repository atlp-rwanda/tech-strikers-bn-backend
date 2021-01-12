import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import bookMock from "../data/booking.mock"
import userMock from "../data/user.mock"
import models from "../../src/database/models/index";
import {jwtToken} from "../../src/utils/util.jwt"
const { Booking} = models;
import dotenv from "dotenv";
dotenv.config();


chai.use(chaiHttp);
chai.should();
const{booking1}=bookMock
const{user1}=userMock

describe('Booking testing ',()=>{

// it("should get all bookings",(done)=>{
//     chai.request(server)
//     .get("/api/v1/bookings")
//     .set("Authorization", `Bearer ${jwtToken.generateToken(user1)}`)
//     .end((err,res)=>{
//         const { data, message} = res.body;
//         expect(res.status).to.equal(200);
//         expect(data);
//         expect(message);
//         expect(res.status).to.equal(200);
     
//      done();   
//     });
// })

it("should get booking  by Id ",(done)=>{
    let book = new Booking( 
    {id: 1,
    checkin:"2021-01-01T00:00:00.000Z",
    checkout: "2021-01-04T00:00:00.000Z",
    userId: 1,
    accommodationId: 1,
    roomId: 1,
    tripId: 1})
    console.log(book.id)

chai.request(server).get(`/api/v1/booking/${book.id}`)
.set("Authorization", `Bearer ${jwtToken.generateToken(user1)}`)
.send(book)
.end((err,res)=>{
    console.log(res.body)
    const { data, message} = res.body
    expect(data);
    expect(message);
    expect(res.status).to.equal(200)
    done();
})

})
it("should create a booking ",(done)=>{
    chai.request(server).post("/api/v1/create/booking")
    .set("Authorization", `Bearer ${jwtToken.generateToken(user1)}`)
    .send(booking1)
    .end((err,res)=>{
        const { data, message} = res.body;
       console.log(res.body)
       console.log(data)
       console.log(message)
        expect(data);
        expect(message);
        expect(res.status).to.equal(400);
        expect(message).to.equal("you can not book the accommodation")
        done();
     
    })
    
    })

})