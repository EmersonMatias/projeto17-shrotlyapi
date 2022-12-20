import express from "express";
import usersRouters from "./routers/usersRouters.js"
import dotenv from "dotenv"
import urlsRouters from "./routers/urlsRouters.js"


dotenv.config()
const app = express()

app.use(express.json())


app.use(usersRouters)
app.use(urlsRouters)

app.listen(4000, () => { console.log("Server Running")})