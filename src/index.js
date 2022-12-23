import express from "express";
import usersRouters from "./routers/usersRouters.js"
import dotenv from "dotenv"
import urlsRouters from "./routers/urlsRouters.js"
import cors from "cors"

dotenv.config()
const app = express()


app.use(express.json())
app.use(cors())

app.use(usersRouters)
app.use(urlsRouters )

const port = process.env.PORT


app.listen(port, () => { console.log("Server Running")})  