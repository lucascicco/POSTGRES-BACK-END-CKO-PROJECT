import Product from '../models/products';
import ProductImage from '../models/productspictures';
import User from '../models/user';
import Purchase from '../models/purchase';
import ProductFile from '../models/productspictures';
import Location from '../models/location';
import { Op } from 'sequelize';
import frete from 'frete';

import { SellsDone } from '../../utils/ArrayFunctions';

class ProductsController{
    async store(req, res){
        const { originalname: name, filename: path } = req.file
        
        const file = await ProductFile.create({
            name,
            path
        })

        const product = await Product.create({
            product_name:  req.body.product_name,
            category: req.body.category,
            price: req.body.price,
            seller: req.userId,
            quantity: req.body.quantity,
            description: req.body.description,
            image_id: file.id
        });

        return res.json({
            product,
            file
        });

    }

    async update(req, res){
        const product = await Product.findByPk(req.body.product_id);

        if(product.seller !== req.userId){
            return res.status(400).json({ error: "You don't have permission to update a product which is not yours." })
        }

        if(req.file){
            const { originalname: name, filename: path } = req.file

            const product_picture = await ProductFile.findByPk(product.dataValues.product_image)

            await product_picture.update({
                name,
                path
            })
        }

        await product.update(req.body);
        
        const product_Updated = await Product.findByPk(req.body.product_id)

        return res.json({
            product: product_Updated
        })
    }

    async getOneProduct(req, res){
        const product = await Product.findByPk(req.query.product_id, {
            include: [
                {
                    model: User ,
                    as: 'user_seller',
                    attributes: ['location']
                }
            ]
        })

        if(!product){
            return res.status(400).json({ error: 'Product was not found.'})
        }

        return res.json(product)
    }

    async getAllProducts(req, res){
        const { page = 1 } = req.query

        const Products = await Product.findAll({
            include: [
                {
                    model: ProductImage,
                    as: 'product_image',
                    aattributes: ['name', 'path', 'url']
                }
            ],
            limit: 20,
            offset: (page - 1) * 20,
        })

        return res.json(Products)
    }

    async getAllProductsExceptMine(req, res){
        const { page = 1} = req.query

        const Products = await Product.findAll({
            include: [
                {
                    model: ProductImage,
                    as: 'product_image',
                    attributes: ['name', 'path', 'url']
                }
            ],
            where: {
                seller: {
                    [Op.ne]: req.userId
                } 
            },
            limit: 20,
            offset: (page - 1) * 20
        })

        return res.json(Products)
    }

    async getProductsByCategory(req, res){
        const { page = 1 } = req.query

        const Products = await Product.findAll({
            where: { category: req.query.category },
            limit: 20,
            offset: (page - 1) * 20,
        })

        return res.json(Products)
    }

    async getMyProducts(req, res){
        const { page = 1} = req.query

        const Products = await Product.findAll({
            where: {
                seller: {
                    [Op.eq]: req.userId
                }
            },
            limit: 20,
            offset: (page - 1) * 20
        })

        const Purchases = await Purchase.findAll({
            where: {
                seller: {
                    [Op.eq]: req.userId
                }
            }
        })
        
        const ProductsGeral = SellsDone(Purchases,Products)
        
        return res.json(ProductsGeral)
    }


    async DeleteProduct(req, res){
        const product = await Product.findByPk(req.body.product_id);
        
        if(product.dataValues.seller !== req.userId){
            return res.status(400).json({ error: "You don't have permission to delete a product which is not yours." })
        }

        await product.destroy();

        return res.json({
            message: "Product has been deleted from database",
            DeletedProduct: product
        });

    }

    async CartOfProducts(req, res){
        const user = await User.findByPk(req.userId)

        const FavoriteArray = user.dataValues.favorite_items

        console.log(user)
        const Products = await Product.findAll({
            where: {
                id: {
                    [Op.in]: FavoriteArray
                }
            }
        })

        return res.json(Products)
    }


    async FreteCalculate(req, res){
        const { user_location } = await User.findByPk(req.userId,{
            include: [
                {
                    model: Location,
                    as: 'user_location',
                    attributes: ['postcode']
                }
            ]
        })

        const product = await Product.findByPk(req.query.product_id)

        const seller = await User.findByPk(product.dataValues.seller,{
            include: [
                {
                    model: Location,
                    as: 'user_location',
                    attributes: ['postcode']
                }
            ]
        })

        
        frete()
            .cepOrigem(user_location.postcode)
            .servico(frete.codigos.pac)
            .prazo(user_location.postcode, (err, results) => {
                const result = results
            })

        return res.json(seller.user_location.postcode)
        
    }
}

export default new ProductsController()