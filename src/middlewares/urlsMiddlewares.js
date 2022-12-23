import jwt from "jsonwebtoken"
import { connection } from "../database/db.js"


export async function validateUserToken(req,res, next){
    const token = req.headers.authorization?.split(" ")[1]
    const url = req.body.url

    if(!token){
        return res.sendStatus(401)
    }

    if(!url){
        return res.status(422).send({error: "URL vazia"})
    }

    try{
        let validateUrl = new URL(url)
    } catch(error){
        return res.status(422).send({error: "URL inválida"})
    }

    jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (error, user) => {
        if(error){
            return res.sendStatus(401)
        }

        req.user = user
        next()
    })
} 

export async function validateUrlId(req,res,next){
    const urlId = req.params.id
    let especificUrl;

    try{
        especificUrl = (await connection.query('SELECT * FROM urls WHERE id=$1',[urlId])).rows[0]

        if(!especificUrl){
            return res.sendStatus(404)
        }
    }catch(error){
        console.log(error)
    }

    req.especificUrl = especificUrl
    next()
}

export async function validateShortUrl(req,res,next){
    const shortUrl = req.params.shortUrl
    let shortUrlExist

    try{
        shortUrlExist =  (await connection.query('SELECT * FROM urls WHERE "shortUrl"=$1',[shortUrl])).rows[0]
      

        if(!shortUrlExist){
            return res.sendStatus(404)
        }
    }catch(error){
        console.log(error)
    }

    
    req.url = shortUrlExist
    next()
}

export async function validateDelete(req,res,next){
    const urlId = req.params.id
    const token = req.headers.authorization?.split(" ")[1]
    let error;
    let user;

    if(!token){
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (errorToken, userData) => {
        error = errorToken
        user=userData
    })

    if(error){
        return res.sendStatus(401)
    }
    
    try{
        const userUrls = (await connection.query('SELECT * FROM urls WHERE id=$1',[urlId])).rows[0]

        if(!userUrls){
            return res.sendStatus(404)
        }

        if(userUrls.userId !== user.id){
            return res.sendStatus(401)
        }

    }catch(error){
        console.log(error)
    }

    next()
} 