import express from 'express'
import useragent from 'express-useragent'
import path from 'path'
import { fileURLToPath } from 'url';
import passport from'passport';
import {Strategy as LocalStrategy} from'passport-local';
import bcrypt from 'bcrypt';
import UserModel from './models/user.js';
import init  from './db/mongodb.js';
import mongoose from 'mongoose';
import minimist from "minimist";
import os from "os";
import cluster from "cluster";
import session from'express-session';
import handlebars from'express-handlebars';


import productos from './router/productos.js'
import carrito from './router/carrito.js'



const params = minimist(process.argv.slice(2), {
  alias : {
    p: "PORT",
    m: "MODE",
    e: "ENV"
  },
  default: {
    p: 8080,
    m: "fork",
    e: 'local'
  }
});

const {PORT, MODE} = params

if(MODE === "cluster" && cluster.isPrimary){  
  const length = os.cpus().length;

  for(let i = 0; i < length; i++){
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker} died`);
  })
} else {

  const app = express()

  const URL = init() 

  mongoose.connect(URL)

  
  passport.use('sign-in', new LocalStrategy({ usernameField: 'email',}, (email, password, done) => {
              UserModel.findOne({ email })
                  .then((user) => {
                      if (!user) {
                          console.log(`User with ${email} not found.`);
                          return done(null, false);
                      }
                      if (!bcrypt.compareSync(password, user.password)) {
                          console.log('Invalid Password');
                          return done(null, false);
                      }
                      done(null, user);
                  })
                  .catch((error) => {
                      console.log('Error in sign-in', error.message);
                      done(error, false);
                  });
          }
      )
  );

  passport.use('sign-up', new LocalStrategy({usernameField: 'email',passReqToCallback: true,},(req, email, password, done) => {
              UserModel.findOne({ email })
                  .then((user) => {
                      if (user) {
                          console.log(`User ${email} already exists.`);
                          return done(null, false);
                      } else {
                          const salt = bcrypt.genSaltSync(10);
                          const hash = bcrypt.hashSync(
                              req.body.password,
                              salt
                          );
                          req.body.password = hash;
                          return UserModel.create(req.body);
                      }
                  })
                  .then((newUser) => {
                      console.log(newUser);
                      if (newUser) {
                          console.log(`User ${newUser.email} registration succesful.`);
                          done(null, newUser);
                      } else {
                          throw new Error('User already exists');
                      }
                  })
                  .catch((error) => {
                      console.log('Error in sign-up', error.message);
                      return done(error);
                  });
          }
      )
  );

  passport.serializeUser((user, done) => {
      done(null, user._id);
  });

  passport.deserializeUser((_id, done) => {
      UserModel.findOne({ _id })
          .then((user) => done(null, user))
          .catch(done);
  });

  app.use(session({
          secret: '25*#J8gh!wsss',
          cookie: {
                  httpOnly: false,
                  secure: false,
                  maxAge: 600000,
          },
          rolling: true,
          resave: false,
          saveUninitialized: false,
      })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(session({    
    secret: '3567!$H4s5K36#ssss',
    resave: false, 
    saveUninitialized: false,
  }));
  
  app.engine(
      "hbs",
      handlebars({
          extname: ".hbs",
          defaultLayout: 'index.hbs',
      })
  );

  app.set("view engine", "hbs");
  app.set("views", __dirname + '/views');

  

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/static', express.static(path.join(__dirname, 'public')))

  app.use(useragent.express())

  app.use('/api/productos', productos)
  app.use('/api/carrito', carrito)
  app.use('*', (req, res) => {
    const path = req.params;
    const method = req.method;
    res.send({ error: -2, descripcion: `ruta '${path[0]}' método '${method}' no implementada` });
  });


  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


  const server = app.listen(PORT, () => {
    console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
    console.log(`http://localhost:${server.address().port}`)
    console.log(`Environment:${ENV}`)
  })

  server.on("error", error => console.log(`Error en servidor ${error}`))
}