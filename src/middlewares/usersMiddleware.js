
import { compareSync, hashSync } from "bcrypt"
import { connection } from "../database/db.js"
import { signinSchema, signupSchema } from "../models/usersSchema.js"


export async function validateSignUp(req, res, next){
    const{name, email, password, confirmPassword} = req.body

    if(!name || !email || !password || !confirmPassword ){
        return res.sendStatus(422)
    }

    const{error} = signupSchema.validate(req.body, {abortEarly: false})

    if(error){
        return res.send(error.message)
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
        return res.sendStatus(422)
    }

    const {error} = signinSchema.validate(req.body)

    if(error){
        return res.sendStatus(422)
    }

    try{
        const userExist = await (await connection.query("SELECT * FROM users WHERE email=$1", [email.toLowerCase()])).rows[0]
        console.log(userExist)
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