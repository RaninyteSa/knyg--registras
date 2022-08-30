export const auth = (req, res, next) => {
    if (req.session.loggedIn)
        return next()

    res.status(401).send('pasibaigė jūsų sesijos laikas ')
}