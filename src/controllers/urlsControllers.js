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
    const {id, shortUrl, url} = req.especificUrl

    const especificUrl = {id, shortUrl, url}


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

export async function getRankingList(req,res){
    try{
        const rankingList =  await connection.query(`
        SELECT users.id, users.name, COUNT(urls."userId") as "linksCount", COALESCE(SUM(urls."visitCount"),0) as "visitCount"
        FROM users  
        LEFT JOIN urls ON users.id=urls."userId" 
        GROUP BY users.id
        ORDER BY  SUM(urls."visitCount") desc NULLS LAST
        LIMIT 10
        `)
        res.status(200).send(rankingList.rows)
    }catch(error){
        console.log(error)
    }
}

export async function deleteUrlUser(req,res){
    const urlId = req.params.id

    try{
        await connection.query("DELETE FROM urls WHERE id=$1",[urlId])
        res.sendStatus(204)
    } catch(error){
        console.log(error)
    }
}