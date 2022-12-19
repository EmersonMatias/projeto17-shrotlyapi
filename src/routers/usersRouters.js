import { Router } from "express";
import { signinUser, singUpUser } from "../controllers/usersControllers.js";
import { validateSignIn, validateSignUp } from "../middlewares/usersMiddleware.js";

const router = Router()



router.post("/signup", validateSignUp, singUpUser)

router.post("/signin", validateSignIn, signinUser)


export default router
