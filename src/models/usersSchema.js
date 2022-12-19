import joi from "joi";

export const signupSchema = joi.object({
    name: joi.string()
        .lowercase()
        .alphanum()
        .min(3)
        .max(50)
        .required(),
    email: joi.string()
        .email()
        .lowercase()
        .required(),
    password: joi.string()
        .min(8)
        .max(50)
        .required(),
    confirmPassword: joi.string()
        .valid(joi.ref('password'))
        .required()
})


export const signinSchema = joi.object({
    email: joi.string()
    .email()
    .required(),
password: joi.string()
    .min(8)
    .max(50)
    .required()
})

