import { Router } from "express";
import { getUrlsUser, signinUser, singUpUser } from "../controllers/usersControllers.js";
import { validateSignIn, validateSignUp, validateUser } from "../middlewares/usersMiddleware.js";

const router = Router()

router.post("/signup", validateSignUp, singUpUser)

router.post("/signin", validateSignIn, signinUser)

router.get("/users/me", validateUser, getUrlsUser)

export default router
