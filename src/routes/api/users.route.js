import express from "express";
import passport from "passport";
import { multerUploads } from "../../middlewares/multer";
import tokenAuth from "../../middlewares/tokenAuthentication";
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
import {UserValidation} from "../../middlewares/user";

const router = express.Router();
const { isSuperAdmin } = RoleCheckMiddleware;
const { roleAssignValidation, roleCreateValidation } = RoleValidation;
const { checklisted } = checkblockedtoken
const { listed } = tokenlist
const { signup, getUserInfo, upDateUser } = UserControllers;
const { loginCallback } = AuthControllers;
const { checkEmailExist } = authMiddleware;
const { login } = loginController;

//route that retrieves user information by id
router.get("/user",checklisted, tokenAuth, getUserInfo);

// this route uses form-data for inputs
router.put("/user",checklisted, tokenAuth, multerUploads, upDateUser);
const { assign, createRole, getRoles, updateRole, deleteRole, getRole} = UserRoleController;

router.post("/user/signup",UserValidation, checkEmailExist, signup);
router.post("/user/assignRole",checklisted, isSuperAdmin, roleAssignValidation, assign);
router.post("/user/createRole",checklisted, isSuperAdmin, roleCreateValidation, createRole);
router.get("/user/getRoles", checklisted,isSuperAdmin, getRoles);
router.delete("/user/deleteRole/:id", checklisted,isSuperAdmin, deleteRole);
router.patch("/user/updateRole/:id", checklisted,isSuperAdmin,updateRole);
router.get("/user/getRole/:id", checklisted,isSuperAdmin, getRole);
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


router.post("/user/signup", signup);
router.post("/auth/siginIn",validateUser,login);

export default router;
