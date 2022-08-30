import express from 'express'
import db from '../database/connect.js'
import { auth } from '../midleware/auth.js'
import { postValidator } from '../midleware/validate.js'

const router = express.Router()


router.get('/', async (req, res) => {
    const posts = await db.Posts.findAll()
    res.json(posts)
})

router.get('/:id', async (req, res) => {
    const post = await db.Posts.findByPk(req.params.id)
    res.json(post)
})

router.post('/', auth, postValidator,  async (req, res) => {
    new db.Posts(req.body).save()
    res.json({ message: 'Įrašas sėkmingai sukurtas' })
})

router.put('/edit/:id', auth , async (req, res) => {
    const post = await db.Posts.findByPk(req.params.id)
    post.update(req.body)
    res.json({ message: 'Įrašas sėkmingai atnaujintas'})
})

router.delete('/delete/:id', auth , async (req, res) => {
    const post = await db.Posts.findByPk(req.params.id)
    post.destroy()
    res.json({ message: 'Įrašas sėkmingai ištrintas' })
})

//CRUD - Create, Read, Update, Delete
//       POST    GET    PUT    DELETE

export default router