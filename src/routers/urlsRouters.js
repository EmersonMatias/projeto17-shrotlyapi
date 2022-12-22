import { Router } from "express";
import { deleteUrlUser, getEspecificUrl, getRankingList, openShortUrl, shortenUrl } from "../controllers/urlsControllers.js";
import { validateDelete, validateShortUrl, validateUrlId, validateUserToken } from "../middlewares/urlsMiddlewares.js";

const router = Router()


router.post("/urls/shorten", validateUserToken, shortenUrl)

router.get("/urls/:id", validateUrlId, getEspecificUrl)

router.get("/urls/open/:shortUrl", validateShortUrl, openShortUrl)

router.get("/ranking", getRankingList)

router.delete("/urls/:id", validateDelete, deleteUrlUser)

export default router