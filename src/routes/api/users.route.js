import express from "express";
import passport from "passport";
import AuthControllers from "../../controllers/auth.controller";
import UserControllers from "../../controllers/user.controller.js";
import authMiddleware from "../../middlewares/auth";
import loginController from "../../controllers/login.controller.js"; 
import validateUser from "../../validation/index";
const router = express.Router();
const { signup } = UserControllers;
const { loginCallback } = AuthControllers;
const { checkEmailExist } = authMiddleware;
const { login } = loginController;
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
