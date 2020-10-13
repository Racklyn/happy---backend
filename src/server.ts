import express from 'express'
import path from 'path'
import cors from 'cors'

import 'express-async-errors'

import './database/connection'

import routes from './routes'

import errorHandler from './errors/handler'

const app = express()


app.use(cors()) //aplicação acessível de qualquer servidor que quiser
app.use(express.json())
app.use(routes)

//criação de endereço para poder acessar as images
app.use('/uploads', express.static(path.join(__dirname,'..','uploads')))
app.use(errorHandler)


app.listen(3333)