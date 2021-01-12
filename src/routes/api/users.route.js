import express from "express";
import passport from "passport";
import { multerUploads } from "../../middlewares/multer"
import tokenAuth from "../../middlewares/tokenAuthentication"
import AuthControllers from "../../controllers/auth.controller";
import UserControllers from "../../controllers/user.controller.js";
import authMiddleware from "../../middlewares/auth";
import loginController from "../../controllers/login.controller.js"; 
import validateUser from "../../validation/login.validation";
import RoleValidation from "../../validation/role.validations";
import UserRoleController from "../../controllers/role.controller";
import RoleCheckMiddleware from "../../middlewares/superAdminCheck";

const { isSuperAdmin } = RoleCheckMiddleware;
const { roleAssignValidation, roleCreateValidation } = RoleValidation;
const { signup, getUserInfo, upDateUser } = UserControllers;
const { assign, createRole, getRoles, updateRole, deleteRole, getRole} = UserRoleController;
const { loginCallback } = AuthControllers;
const { checkEmailExist } = authMiddleware;
const { login } = loginController;

const router = express.Router();

//route that retrieves user information by id
router.get("/user", tokenAuth, getUserInfo);

// this route uses form-data for inputs
router.put("/user", tokenAuth, multerUploads, upDateUser);
router.post("/user/signup", checkEmailExist, signup);
router.post("/user/assignRole", tokenAuth,isSuperAdmin, roleAssignValidation, assign);
router.post("/user/createRole", tokenAuth, isSuperAdmin, roleCreateValidation, createRole);
router.get("/user/getRoles", tokenAuth, isSuperAdmin, getRoles);
router.delete("/user/deleteRole/:id", tokenAuth, isSuperAdmin, deleteRole);
router.patch("/user/updateRole/:id", tokenAuth, isSuperAdmin,updateRole);
router.get("/user/getRole/:id", tokenAuth, isSuperAdmin, getRole);
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
