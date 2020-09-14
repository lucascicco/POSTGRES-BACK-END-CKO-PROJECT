import Product from '../models/products';
import Features from '../models/productsfeatures';

class FeatureSendingControlller{
    async store(req, res) {
        const productFindByPk = await Product.findByPk(req.body.product)
        
        const FeaturesItem = await Features.create({
            weight: req.body.weight,
            height: req.body.height,
            format: req.body.format,
            length: req.body.length,
            width:  req.body.width,
            diameter: req.body.diameter
        })

        await productFindByPk.update({
            features: FeaturesItem.id
        })

        return res.json(FeaturesItem)
    }
    
    async update(req, res){
        const { dataValues } = await Product.findByPk(req.body.product)
        
        const FeaturesItem = await Features.findByPk(dataValues.features)
    
        await FeaturesItem.update(req.body)

        return res.json(FeaturesItem)
    }
}

export default new FeatureSendingControlller()