import express from "express";
import passport from "passport";
import { multerUploads } from "../../middlewares/multer"
import tokenAuth from "../../middlewares/tokenAuthentication"
import AuthControllers from "../../controllers/auth.controller";
import UserControllers from "../../controllers/user.controller.js";
import authMiddleware from "../../middlewares/auth";
import loginController from "../../controllers/login.controller.js"; 
import validateUser from "../../validation/login.validation";
const router = express.Router();
const { signup, getUserInfo, upDateUser } = UserControllers;
const { loginCallback } = AuthControllers;
const { checkEmailExist } = authMiddleware;
const { login } = loginController;

//route that retrieves user information by id
router.get("/user", tokenAuth, getUserInfo);

// this route uses form-data for inputs
router.put("/user", tokenAuth, multerUploads, upDateUser);

router.post("/user/signup", checkEmailExist, signup);


router.get(
  "/user/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/user/login/google/redirect/",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  AuthControllers.loginCallback
);

router.get(
  "/user/login/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get(
  "/user/login/facebook/redirect/",
  passport.authenticate("facebook", {
    failureRedirect: "/",
  }),
  AuthControllers.loginCallback
);


router.post("/user/signup", signup);
router.post("/auth/siginIn",validateUser,login);

export default router;
