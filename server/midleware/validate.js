import Joi from 'joi'

const validate = (schema, req, next) => {
    const options = {
        abortEarly: true,
        stripUnknown: true
    }
    const { error, value } = schema.validate(req.body, options)

    if(error) 
        next('įvyko validacijos klaida/ neteisingai užpildytos reikšmės')

    req.body = value
    next()
}
 export const postValidator = (req, res, next) => {
    const schema = Joi.object({
        pavadinimas: Joi.string().min(5).max(255).required(),
        autorius: Joi.string().min(5).max(255).required(),
        virselioAutorius: Joi.string(),
        ISBN: Joi.string(),
        nuotrauka: Joi.string().min(5).max(255).required()
    })
    validate(schema, req, next)
}

export default validate