import express from 'express';
import path from 'path';
import { Router } from 'express';
import passport from 'passport';
import { logger } from "../logger/logger.js";
import upload from "../middlewares/multer.js";
import sendMail from '../utils/sendemail.js';
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
router.post('/sign-up', upload.single("avatar"), passport.authenticate('sign-up', { successRedirect: '/', failureRedirect: '/errorregistro', }), (req, res) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    console.log(req);
    const { user } = req;
    const content = `
    <div>
      <h2>INFO NUEVO REGISTRO </h2>
      <ul>
            <li>Nombre: ${nombre}</li>
            <li>Email: ${email}</li>
            <li>Password: ${password}</li>
            <li>Phone Number: ${telefono}</li>
            <li>Direccion: ${direccion}</li>
            <li>Edad: ${edad}</li>
            <li>Avatar/foto: ${avatar}</li>
      </ul>
    </div>`
    sendMail('Nuevo Registro',content)
    console.log('registro -> user', user);
}
);


export default router