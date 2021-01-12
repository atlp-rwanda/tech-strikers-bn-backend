import bcrypt from "bcrypt";
import DataURI from "datauri/parser";
import path from 'path';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const dataUri = new DataURI();

const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, 15);
  return hash;
};
const decryptPassword = async (dataTodecrypt, dataBaseHash) => {
  const deHashedPassword = await bcrypt.compare(dataTodecrypt, dataBaseHash);
  return deHashedPassword;
};

const verifyToken = (token) => {
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1d"});
        return decoded;
    }

const oauthCallback = (refreshToken, accessToken, profile, cb) => {
  if (profile) {
    const { displayName, emails, provider } = profile;
    const profileData = {
      fullname: displayName,
      email: emails[0].value,
      provider,
    };
    return cb(null, profileData);
  }
};

const base64FileStringGenerator = (req) => {
  return dataUri.format(path.extname(req.file.originalname).toString(), req.file.buffer)
  
}

export default {
  hashPassword,
  oauthCallback,
  decryptPassword,
  base64FileStringGenerator,
  verifyToken
};
