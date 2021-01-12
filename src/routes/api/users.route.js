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
import BookingController from "../../controllers/booking.controller";
import RoleCheckMiddleware from "../../middlewares/superAdminCheck";
const { isSuperAdmin } = RoleCheckMiddleware;
const { roleAssignValidation, roleCreateValidation } = RoleValidation;
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
const { assign, createRole, getRoles, updateRole, deleteRole, getRole} = UserRoleController;
router.get("/user", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

router.put("/user", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

router.post("/user/signup", checkEmailExist, signup);
router.post("/user/assignRole", isSuperAdmin, roleAssignValidation, assign);
router.post("/user/createRole", isSuperAdmin, roleCreateValidation, createRole);
router.get("/user/getRoles", isSuperAdmin, getRoles);
router.delete("/user/deleteRole/:id", isSuperAdmin, deleteRole);
router.patch("/user/updateRole/:id", isSuperAdmin,updateRole);
router.get("/user/getRole/:id", isSuperAdmin, getRole);
router.delete("/user", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});


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
