import express from "express";
import passport from "passport";
import { multerUploads } from "../../middlewares/multer";
import tokenAuth from "../../middlewares/tokenAuthentication";
import validateSignup from "../../validation/signup.validation ";
import {
  validatePassword,
  validateEmail,
} from "../../validation/reset.validation";
import resetController from "../../controllers/reset.controller";
import AuthControllers from "../../controllers/auth.controller";
import authMiddleware from "../../middlewares/auth";
import loginController from "../../controllers/login.controller.js";
import validateUser from "../../validation/login.validation";
import RoleValidation from "../../validation/role.validations";
import UserRoleController from "../../controllers/role.controller";
import RoleCheckMiddleware from "../../middlewares/superAdminCheck";
import UserControllers from "../../controllers/user.controller";
import checkblockedtoken from "../../middlewares/blacklist";
import tokenlist from "../../controllers/list.controllers";
import  SocialLogin from "../../controllers/google.facebook.login";
const { googleLogin, facebookLogin } = SocialLogin;
const router = express.Router();
const { isSuperAdmin } = RoleCheckMiddleware;
const { roleAssignValidation, roleCreateValidation } = RoleValidation;
const { checklisted } = checkblockedtoken;
const { listed } = tokenlist;
const {
  signup,
  getUserInfo,
  upDateUser,
  resend,
  confirmation,
} = UserControllers;
const {
  assign,
  createRole,
  getRoles,
  updateRole,
  deleteRole,
  getRole,
} = UserRoleController;
const { checkEmailExist, checkUsernameExist } = authMiddleware;

const { loginCallback } = AuthControllers;

const { login } = loginController;

router.get("/user", checklisted, tokenAuth, getUserInfo);

// this route uses form-data for inputs
router.put("/user", checklisted, tokenAuth, multerUploads, upDateUser);

router.post(
  "/user/signup",
  validateSignup,
  [checkEmailExist, checkUsernameExist],
  signup
);
router.post(
  "/user/assignRole",
  checklisted,
  isSuperAdmin,
  roleAssignValidation,
  assign
);
router.post(
  "/user/createRole",
  checklisted,
  isSuperAdmin,
  roleCreateValidation,
  createRole
);
router.get("/user/getRoles", checklisted, isSuperAdmin, getRoles);
router.delete("/user/deleteRole/:id", checklisted, isSuperAdmin, deleteRole);
router.patch("/user/updateRole/:id", checklisted, isSuperAdmin, updateRole);
router.get("/user/getRole/:id", checklisted, isSuperAdmin, getRole);
router.post("/user/logout", checklisted, listed);
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

router.post("/auth/siginIn", validateUser, login);
router.post("/user/resend", resend);
router.post("/user/confirmation/:token", confirmation);
router.post(
  "/auth/forgot_password",
  validateEmail,
  resetController.forgetPassword
);
router.post(
  "/reset_password/:token",
  validatePassword,
  resetController.resetPassword
);

router.post("/auth/googlelogin", googleLogin);
router.post("/auth/facebooklogin", facebookLogin);


export default router;

