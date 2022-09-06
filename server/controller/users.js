import express from 'express'
import bcrypt from 'bcrypt'
import db from '../database/connect.js'
import { registerValidator, loginValidator } from '../midleware/validate.js'
import { auth } from '../midleware/auth.js'

const router = express.Router()
router.get('/all-posts/:userid', async (req,res) => {
    try {
        const user = await db.Users.findByPk(req.params.userid, {
            include: db.Posts
        })

        res.json(user)
    } catch {
        res.send('serverio klaida')
    }
})

router.post('/register', registerValidator, async (req, res) => {
    try {
        const userExists = await db.Users.findOne({ 
            where: { 
                email: req.body.email 
            } 
        })
        
        if(userExists) {
            res.status(401).send('Toks vartotojas jau egzistuoja')
            return
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)

        await db.Users.create(req.body)
        res.send('Vartotojas sėkmingai sukurtas')

    } catch(error) {

        console.log(error)
        res.status(418).send('Įvyko serverio klaida')
    }
})

router.post('/login', loginValidator, async (req, res) => {
    try {
        const user = await db.Users.findOne({ 
            where: { 
                email: req.body.email 
            } 
        })
        
        if(!user) 
            return res.status(401).send('Toks vartotojas nerastas')

        if(await bcrypt.compare(req.body.password, user.password)) {
            req.session.loggedIn = true
            req.session.user = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            }

        res.json({message: 'prisijungimas sekmingas', user: req.session.user})    
    } else {
    res.status(401).send('nepavyko prisijungti')
    }     
} catch (error) {
    console.log(error);
        res.status(418).send('ivyko serverio klaida')
    }

})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.send('jūs sėkmingai atsijungėte')
}) 

router.get('/check-auth', auth,  async (req, res) => {
    console.log(req.session.user)
    res.json(req.session.user)
})

export default router