import express from 'express';
import path from 'path';
import { Router } from 'express';
import passport from 'passport';
import { logger } from "../logger/logger.js";
const router = Router(Router)

router.get('/', (req, res) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    if (!req.isAuthenticated()) {
        res.render('login');
    } else {
        const { user } = req;
        let data = { user: user.email };
        res.render('home', data);
    }
});

router.post('/sign-in', passport.authenticate('sign-in', { successRedirect: '/', failureRedirect: '/errorlogin', }), (req, res) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    res.redirect('/');
});

router.get('/errorlogin', (req, res) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    res.render('errorlogin');
});

router.get('/logout', (req, res) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    res.render('logout');
});

router.post('/logout', (req, res) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    const { email } = req.body;
    req.logout((error) => {
        if (!error) {
            let data = { user: email};
            res.render('logout', data);
        } else {
            res.send('Ocurrio un  error', error.message);
        }
    });
});

export default router