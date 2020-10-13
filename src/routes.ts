import {Router} from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'

import OrphanagesController from './controllers/OrphanagesController'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/orphanages/:id', OrphanagesController.show)
routes.get('/orphanages', OrphanagesController.index)
//para realizar upload das imagens ao cadastrar orfanato
routes.post('/orphanages', upload.array('images'), OrphanagesController.create)

export default routes;


/**
 * {
	"name": "Fundanó 4",
	"latitude": -9.3978204,
	"longitude": -36.620877,
	"about": "Sobre o orfanato",
	"instructions": "Venha nos visitar",
	"opening_hours": "Das 8h até 18h",
	"open_on_weekends": true
}
 */