import { Op } from 'sequelize';
import { calcularPrecoPrazo } from 'correios-brasil';
import Product from '../models/products';
import User from '../models/user';
import Purchase from '../models/purchases';
import Location from '../models/location';
import Features from '../models/productsfeatures';

import { SellsDone } from '../../utils/ArrayFunctions';

class ProductsController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const product = await Product.create({
      product_name: req.body.product_name,
      category: req.body.category,
      price: req.body.price,
      seller: req.userId,
      quantity: req.body.quantity,
      description: req.body.description,
      name,
      path,
    });

    return res.json(product);
  }

  async update(req, res) {
    const product = await Product.findByPk(req.body.product_id);

    if (product.seller !== req.userId) {
      return res.status(400).json({
        error:
          "You don't have permission to update a product which is not yours.",
      });
    }

    if (req.file) {
      const { originalname: name, filename: path } = req.file;

      await product.update({
        name,
        path,
      });
    }

    await product.update(req.body);

    const product_Updated = await Product.findByPk(req.body.product_id);

    return res.json({
      product: product_Updated,
    });
  }

  async getOneProduct(req, res) {
    const product = await Product.findByPk(req.query.product_id, {
      include: [
        {
          model: User,
          as: 'user_seller',
          attributes: ['location'],
        },
      ],
    });

    if (!product) {
      return res.status(400).json({ error: 'Product was not found.' });
    }

    return res.json(product);
  }

  async getAllProducts(req, res) {
    const { page = 1 } = req.query;

    const Products = await Product.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(Products);
  }

  async getAllProductsExceptMine(req, res) {
    const { page = 1 } = req.query;

    const Products = await Product.findAll({
      where: {
        seller: {
          [Op.ne]: req.userId,
        },
      },
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(Products);
  }

  async getProductsByCategory(req, res) {
    const { page = 1 } = req.query;

    const Products = await Product.findAll({
      where: { category: { [Op.eq]: req.query.category } },
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(Products);
  }

  async getMyProducts(req, res) {
    const { page = 1 } = req.query;

    const Products = await Product.findAll({
      where: { seller: { [Op.eq]: req.userId } },
      limit: 20,
      offset: (page - 1) * 20,
    });

    const Purchases = await Purchase.findAll({
      where: {
        seller: {
          [Op.eq]: req.userId,
        },
      },
    });

    const ProductsGeral = SellsDone(Purchases, Products);

    return res.json(ProductsGeral);
  }

  async DeleteProduct(req, res) {
    const product = await Product.findByPk(req.body.product_id);

    if (product.dataValues.seller !== req.userId) {
      return res.status(400).json({
        error:
          "You don't have permission to delete a product which is not yours.",
      });
    }

    await product.destroy();

    return res.json({
      message: 'Product has been deleted from database',
      DeletedProduct: product,
    });
  }

  async CartOfProducts(req, res) {
    const user = await User.findByPk(req.userId);

    const FavoriteArray = user.dataValues.favorite_items;

    console.log(user);
    const Products = await Product.findAll({
      where: {
        id: {
          [Op.in]: FavoriteArray,
        },
      },
    });

    return res.json(Products);
  }

  async FreteCalculate(req, res) {
    const location_purchase = await Location.findByPk(req.query.locationId);

    const { features_product, dataValues } = await Product.findByPk(
      req.query.product_id,
      {
        include: [
          {
            model: Features,
            as: 'features_product',
            attributes: [
              'weight',
              'format',
              'width',
              'height',
              'diameter',
              'length',
            ],
          },
        ],
      }
    );

    const { user_location } = await User.findByPk(dataValues.seller, {
      include: [
        {
          model: Location,
          as: 'user_location',
          attributes: ['postcode'],
        },
      ],
    });

    const {
      weight,
      format,
      length,
      height,
      width,
      diameter,
    } = features_product.dataValues;

    const args = {
      sCepOrigem: `${location_purchase.dataValues.postcode}`,
      sCepDestino: `${user_location.dataValues.postcode}`,
      nVlPeso: `${weight}`,
      nCdFormato: `${format}`,
      nVlComprimento: `${length}`,
      nVlAltura: `${height}`,
      nVlLargura: `${width}`,
      nCdServico: req.query.service,
      nVlDiametro: `${diameter}`,
    };

    calcularPrecoPrazo(args)
      .then((response) => {
        return res.json(response);
      })
      .catch((e) => {
        return res.json({
          error: e,
        });
      });
  }

  async ChangeStatus(req, res) {
    const product = await Product.findByPkg(req.body.product_id);

    if (product.seller !== req.userId) {
      return res.status(401).json({
        error: 'You do not have permission to change this product status.',
      });
    }

    await product.update({
      status: req.body.status,
    });

    if (req.body.status === 'closed') {
      await product.update({
        paused_at: new Date(),
      });
    }

    return res.json(product);
  }
}

export default new ProductsController();
