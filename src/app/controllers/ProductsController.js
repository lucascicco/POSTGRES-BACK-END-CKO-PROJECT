import Product from '../models/products';
import User from '../models/user';
import Purchase from '../models/purchases';
import FavoriteItem from '../models/favoriteitems';
import ProductFile from '../models/productspictures';
import { Op } from 'sequelize';

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

            const product_picture = await ProductFile.findByPk(product.product_image)

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
        const product = await Product.findByPk(req.query.product_id)

        if(!product){
            return res.status(400).json({ error: 'Product was not found.'})
        }



        return res.json(product)
    }

    async getAllProducts(req, res){
        const { page = 1 } = req.query

        const Products = await Product.findAll({
            limit: 20,
            offset: (page - 1) * 20,
        })

        return res.json(Products)
    }

    async getAllProductsExceptMine(req, res){
        const { page = 1} = req.query

        const Products = await Product.findAll({
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
        
        if(product.seller !== req.userId){
            return res.status(400).json({ error: "You don't have permission to delete a product which is not yours." })
        }

        await product.destroy();

        return res.json({
            message: "Product has been deleted from database",
            DeletedProduct: product
        });

    }

    async CartOfProducts(req, res){
        const user = await User.findByPk(req.userId, {
           include:  [{
                model: FavoriteItem,
                as: 'user_favorite_items',
                attributes: ['id', 'favorite_array']
            }]
        })

        const FavoriteArray = user.dataValues.user_favorite_items.dataValues.favorite_array

        const Products = await Product.findAll({
            where: {
                id: {
                    [Op.in]: FavoriteArray
                }
            }
        })

        return res.json(Products)
    }


      
}

export default new ProductsController()