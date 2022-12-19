import { connection } from "../database/db.js"
import jwt from "jsonwebtoken"

export async function singUpUser(req,res){
    const {name, email, password} = req.user
    console.log(name, email, password)

    try{
        connection.query("INSERT INTO users (name, email, password) VALUES ($1,$2,$3)",[name, email, password])
   
        res.sendStatus(200)
    } catch(error){
        console.log(error)
    }
}


export async function signinUser(req,res){
    const user = req.user
    const acessToken = jwt.sign(user, process.env.ACESS_TOKEN_SECRET)
    
    res.status(200).send(acessToken)
} 