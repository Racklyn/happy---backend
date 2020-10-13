import { request } from 'express'
import multer from 'multer'
import path from 'path' //ajuda a criar caminhos relativos... já vem com o node

export default {
    //salvar imagens localmente
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..','..','uploads'),
        filename:(request,file, cb)=>{
             //para não ocorrer de ter arquivos com o mesmo nome e sobrescrever. Por isso usa o horário atual
            const fileName = `${Date.now()}-${file.originalname}`

            cb(null, fileName) //o 1° é caso aconteça um erro. Como nesse caso é improvável, passamos null
        }
    })
}