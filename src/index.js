import express from "express";
import signUp from "./routers/usersRouters.js"
import dotenv from "dotenv"


dotenv.config()
const app = express()

app.use(express.json())


app.use(signUp)

app.listen(4000, () => { console.log("Server Running")})