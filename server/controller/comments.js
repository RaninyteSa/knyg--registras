import express from "express";
import { auth } from "../midleware/auth.js";
import { commentsValidator } from "../midleware/validate.js";
import db from "../database/connect.js";

const Router = express.Router()

Router.post('/' , auth, commentsValidator, async (req,res) => {
    try {
        await db.Comments.create(req.body)
        res.send('Komentaras sekmingai issaugotas')
    } catch (error)  {
        console.log(error);
        res.status(500).send('ivyko serverio klaida')
    }
})

export default Router
