import express from "express";
import passport from "passport";
import AuthControllers from "../../controllers/auth.controller";
import UserControllers from "../../controllers/user.controller.js";
import BookingControllers   from "../../controllers/booking.controller"
import authMiddleware from "../../middlewares/auth";

const router = express.Router();
const { signup } = UserControllers;
const { loginCallback } = AuthControllers;
const { checkEmailExist } = authMiddleware;

router.get("/user", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

router.put("/user", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

router.post("/user/signup", checkEmailExist, signup);

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

router.get("/bookings",BookingControllers.bookingAll)
router.get("/booking/:id",BookingControllers.bookingById)

export default router;
