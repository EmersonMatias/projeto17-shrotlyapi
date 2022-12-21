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

export async function getUrlsUser(req,res){
    const {id, name, totalVisitCount} = req.user

  try{
    const userData =  (await connection.query('SELECT id,"shortUrl", url, "visitCount" FROM urls WHERE "userId"=$1',[1])).rows
    
    const newUserData = {id, name, totalVisitCount, shortenedUrls: userData}

    res.status(200).send(newUserData)

  } catch(error){
    console.log(error)
  }

}