import mongoose from 'mongoose'
import config from '../config.js'

export default function init (){
  try {    
    mongoose.connect(config.mongoDB.URI)
    console.log('Database connected.')
  } catch (error) {
    console.error('Error to connecto to database', error.message)
  }
}



