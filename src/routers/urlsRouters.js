import { Router } from "express";
import { getEspecificUrl, openShortUrl, shortenUrl } from "../controllers/urlsControllers.js";
import { validateShortUrl, validateUrlId, validateUserToken } from "../middlewares/urlsMiddlewares.js";

const router = Router()


router.post("/urls/shorten", validateUserToken, shortenUrl)

router.get("/urls/:id", validateUrlId, getEspecificUrl)

router.get("/urls/open/:shortUrl", validateShortUrl, openShortUrl)


export default router