import express from 'express'
import bcrypt from 'bcrypt'
import db from '../database/connect.js'

const router = express.Router()

 const saltRounds = 10

router.post('/register', async (req, res) => {


   

    try {
        const userExists = await db.Users.findOne({ 
            where: {
                 email: req.body.email
                }
            })
    
            if(userExists) {
                res.status(401).send('vartotojas jau egzistuoja')
                return
            }
            req.body.password = await bcrypt.hash(req.body.password, 10)
        await db.Users.create(req.body)
        
        res.send('Vartotojas sėkmingai sukurtas')
    } catch {
        res.status(400).send('Registracija nepavyko')
    }
})

router.post('/login', async (req,res) => {
try {
        
    const user = await db.Users.findOne({
        where: {
            email: req.body.email
        }
    })
    if(!user)
    return res.status(401).send('vartotojas nerastas')

    if(await bcrypt.compare(req.body.password, user.password)) {
        req.session.loggedIn = true

    res.send('prisijungimas sekmingas')    
    } else {
    res.status(401).send('nepavyko prisijungti')
    }     
} catch (error) {
        res.status(418).send('ivyko serverio klaida')
    }

})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.send('jūs sėkmingai atsijungėte')
}) 

export default router