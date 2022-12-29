import express from 'express';
import path from 'path';
import { Router } from 'express';
import passport from 'passport';
import { logger } from "../logger/logger.js";
const router = Router(Router)

router.get('/registro', (req, res, next) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    res.render('registro');
});

router.get('/errorregistro', (req, res) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    console.log(req);
    res.render('errorregistro');
});
router.post('/sign-up', passport.authenticate('sign-up', { successRedirect: '/', failureRedirect: '/errorregistro', }), (req, res) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    console.log(req);
    const { user } = req;
    console.log('registro -> user', user);
}
);


export default router