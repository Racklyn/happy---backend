import {Request, Response} from 'express' //contendo o 'type' dos parâmetros

import {getRepository} from 'typeorm'
import Orphanage from '../models/Orphanage'
import orphanageView from '../views/orphanages_view'

import * as Yup from 'yup' //não tem export default

export default {

    async index(request: Request, response: Response){
        const orphanagesRepository = getRepository(Orphanage)

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        }) //comando para LISTAR os registros

        return response.json(orphanageView.renderMany(orphanages))
    },

    async show(request: Request, response: Response){
        const {id} = request.params

        const orphanagesRepository = getRepository(Orphanage)

        //retornar apenas um resgistro que tenho o ID passado. Caso não exista, retornará um erro
        const orphanage = await orphanagesRepository.findOneOrFail(id,{
            relations: ['images']
        })

        return response.json(orphanageView.render(orphanage))
    },

    async create(request: Request, response: Response){ //informando o tipo do dados ao typescript
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body
    
        const orphanagesRepository = getRepository(Orphanage)
    
        //forçando que seja passado como uma array de arquivos (probleminha do Multer)
        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image=>{
            return {path: image.filename}
        })


        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        }

        //modelo da validação
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required(),
            }))
        })

        //realizando validação
        await schema.validate(data,{
        //mesmo que verifique o erro de uma prop, só parará quando verificar todas, mostrando assim se tiver mais de um erro
            abortEarly: false, 
        })

        const orphanages = orphanagesRepository.create(data)
        await orphanagesRepository.save(orphanages) //salvando no BD
    
        return response.status(201).json(orphanages) //201 é o cógido informando que algo foi criado
    }
}