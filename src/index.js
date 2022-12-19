import express from "express";

const app = express()




app.get("/", (req,res)=> {

    res.send("oK")
})



app.listen(4000, () => { console.log("Server Running")})