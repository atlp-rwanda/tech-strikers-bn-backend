import express from "express";
import passport from "passport";
import { multerUploads } from "../../middlewares/multer";
import tokenAuth from "../../middlewares/tokenAuthentication";
import AuthControllers from "../../controllers/auth.controller";
import UserControllers from "../../controllers/user.controller";
import authMiddleware from "../../middlewares/auth";
import {isVerified} from "../../middlewares/isVerified"
import loginController from "../../controllers/login.controller"; 
import validateUser from "../../validation/login.validation";
import RoleValidation from "../../validation/role.validations";
import UserRoleController from "../../controllers/role.controller";
import RoleCheckMiddleware from "../../middlewares/superAdminCheck";
import checkblockedtoken from "../../middlewares/blacklist";
import tokenlist from "../../controllers/list.controllers";
const { isSuperAdmin } = RoleCheckMiddleware;
const { roleAssignValidation, roleCreateValidation } = RoleValidation;
const { checklisted } = checkblockedtoken
const { listed } = tokenlist
const { loginCallback } = AuthControllers;
import validateSignup from "../../validation/signup.validator"
import resetController from "../../controllers/resetController"
import{validatePassword,validateEmail} from "../../validation/reset.validator"
const router = express.Router();
const { signup, getUserInfo, upDateUser,resend,confirmation } = UserControllers;
const { login } = loginController;
const { checkEmailExist,checkUsernameExist } = authMiddleware;


//route that retrieves user information by id
router.get("/user",checklisted, tokenAuth, getUserInfo);

// this route uses form-data for inputs
router.put("/user",checklisted, tokenAuth, multerUploads, upDateUser);

const { assign, createRole, getRoles, updateRole, deleteRole, getRole} = UserRoleController;
router.post("/user/assignRole",checklisted, isSuperAdmin, roleAssignValidation, assign);
router.post("/user/createRole",checklisted, isSuperAdmin, roleCreateValidation, createRole);
router.get("/user/getRoles", checklisted,isSuperAdmin, getRoles);
router.delete("/user/deleteRole/:id", checklisted,isSuperAdmin, deleteRole);
router.patch("/user/updateRole/:id", checklisted,isSuperAdmin,updateRole);
router.get("/user/getRole/:id", checklisted,isSuperAdmin, getRole);

router.post("/user/logout", checklisted, listed);

/* router.delete("/user", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
}); */
router.put("/user", tokenAuth,multerUploads, upDateUser);
router.post("/user/signup",validateSignup,checklisted,[checkEmailExist,checkUsernameExist],signup);
router.post("/user/resend",resend)
router.post("/user/confirmation/:token",confirmation);

router.delete("/user", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});
router.post("/auth/forgot_password",validateEmail,resetController.forgetPassword)
router.post("/reset_password/:token",validatePassword,resetController.resetPassword)

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


router.post("/auth/siginIn",validateUser,login);

export default router;
