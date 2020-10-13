import Image from '../models/Image'

export default{
    render(image: Image){
        return{
            id: image.id,
            url: `http://localhost:3333/uploads/${image.path}` //para retornar o endereço completo da imagem
        }
    },

    renderMany(image: Image[]){
        return image.map(image=>this.render(image))
    }
}