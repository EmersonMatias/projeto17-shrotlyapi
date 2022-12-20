import {nanoid} from "nanoid"
import { connection } from "../database/db.js"

export async function shortenUrl(req,res){
    const url = req.body.url
    const {id}= req.user
    const shortenedUrl = nanoid(10)

    try{
        await connection.query('INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1,$2,$3)',[url, shortenedUrl, id])
        res.send({"shortenedUrl": shortenedUrl})
    } catch(error){
        res.send(error.detail)
    }

    
} 

export async function getEspecificUrl(req,res){
    const {id, shortUrl, url, visitCount} = req.especificUrl

    const especificUrl = {id, shortUrl, url, visitCount}


    res.send(especificUrl)

}

export async function openShortUrl(req,res){
    const {id,url, visitCount} = req.url

    const visitCountUpdate = visitCount+1

    try{
        await connection.query('UPDATE urls SET "visitCount"=$1 WHERE id=$2',[visitCountUpdate, id])
    }catch(error){
        console.log(error)
    }

    res.redirect(url)
} 