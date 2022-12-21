import { Router } from "express";
import { getEspecificUrl, getRankingList, openShortUrl, shortenUrl } from "../controllers/urlsControllers.js";
import { connection } from "../database/db.js";
import { validateShortUrl, validateUrlId, validateUserToken } from "../middlewares/urlsMiddlewares.js";

const router = Router()


router.post("/urls/shorten", validateUserToken, shortenUrl)

router.get("/urls/:id", validateUrlId, getEspecificUrl)

router.get("/urls/open/:shortUrl", validateShortUrl, openShortUrl)

router.get("/ranking", getRankingList)

router.get("/",  async(req,res) => {
    const a = await connection.query("SELECT * FROM urls")
    res.send(a.rows)
})

export default router