import { URLController } from 'controller/URL.Controller'
import { MongoConnection } from 'database/MongoConnection'
import express from 'express'
import { Request, Response } from 'express'

const api = express()
api.use(express.json())

const database = new MongoConnection()
database.connect()

const urlController = new URLController()
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)

//inicialização da api
api.listen(5000, () => console.log('Express listening'))