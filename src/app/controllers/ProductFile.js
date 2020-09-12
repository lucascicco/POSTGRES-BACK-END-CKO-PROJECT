import ProductFile from '../models/productspictures';

class ProductFileController{
    async store(req, res){
        const { originalname: name, filename: path } = req.file

        const file = await ProductFile.create({
            name,
            path
        })

        return res.json(file);
                
    }
}

export default new ProductFileController();
