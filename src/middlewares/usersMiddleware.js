
import { compareSync, hashSync } from "bcrypt"
import jwt from "jsonwebtoken"
import { connection } from "../database/db.js"
import { signinSchema, signupSchema } from "../models/usersSchema.js"


export async function validateSignUp(req, res, next){
    const{name, email, password, confirmPassword} = req.body

    if(!name || !email || !password || !confirmPassword ){
        return res.status(422).send({message: "Campos vazios."})
    }

    const{error} = signupSchema.validate(req.body, {abortEarly: false})

    if(error){
        return res.status(422).send(error.message)
    }

    try{
        const emailExist = (await connection.query('SELECT email FROM users WHERE email=($1)', [email.toLowerCase()])).rows[0]

        if(emailExist){
            return res.sendStatus(409)
        }
    } catch(error){
        console.log(error)
    } 
   
    const encryptedPassword = hashSync(password, 10)
    req.user = {name, email: email.toLowerCase(), password: encryptedPassword}

    next()
}

export async function validateSignIn(req,res,next){
    const{email, password} = req.body
    let user;

    if(!email || !password){
        return res.status(422).send({message: "Campos vazios"})
    }

    const {error} = signinSchema.validate(req.body)

    if(error){
        return res.status(422).send(error.message)
    }

    try{
        const userExist = await (await connection.query("SELECT * FROM users WHERE email=$1", [email.toLowerCase()])).rows[0]
        
        if(!userExist){
            return res.sendStatus(401)
        }

        const validatePassword = compareSync(password, userExist.password)

        if(!validatePassword){
            return res.sendStatus(401)
        }

        user = userExist
        
    } catch(error){
        console.log(error)
    }

    req.user = {id: user?.id, name: user?.name, email: user?.email}
    next()
}


export async function validateUser(req,res, next){
    const token = req.headers.authorization?.split(" ")[1]
    let user;
    let userExist;
    let error;

    if(!token){
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (errorToken, userData) => {
        error = errorToken
        user = userData
    })

    if(error){
        return res.sendStatus(401)
    }

    try{
        userExist = (await connection.query('SELECT users.id, users.name, SUM("visitCount") as "totalVisitCount" FROM users JOIN urls ON users.id=urls."userId" WHERE users.id=$1 GROUP BY users.id',[user.id])).rows[0]

        if(!userExist){
            return res.sendStatus(404)
        }
    } catch(error){
        console.log(error)
    }

    req.user = userExist
    next()
   

}