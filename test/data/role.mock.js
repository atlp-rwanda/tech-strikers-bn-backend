import dotenv from "dotenv";
dotenv.config();
const password = process.env.SUPER_ADMIN_PASSWORD;
export default {
       superAdmin : { 
              fullname: "super Admin",
              username: "superAdmin00",
              email: "admin@gmail.com",
              password: password,
              isVerified: true,
              roleId: 1,
              createdAt: new Date(),
              updatedAt: new Date()
                 },

        simpleUser: {
                     fullname: "Thierry Ntirandekura",
                     email: "ntirandth@gmail.com",
                     password: "kdkdMhe23",
                     roleId: null,
                     username: "warrior",
                     isVerified: true
                   },
       
}