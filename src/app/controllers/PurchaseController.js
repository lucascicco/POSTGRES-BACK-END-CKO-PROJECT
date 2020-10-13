import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import Purchase from '../models/purchases';
import Product from '../models/products';
import Location from '../models/location';
import PersonalData from '../models/information';
import User from '../models/user';

import Email from '../../lib/Mail';

class PurchaseController {
  async store(req, res) {
    const productFindByPk = await Product.findByPk(req.body.product);

    const availableQuantity = productFindByPk.dataValues.quantity;

    const Buyer_Profile = await User.findByPk(req.userId);

    if (availableQuantity === 0) {
      return res.status(400).json({
        error: 'Please, try later. The product has sold out.',
      });
    }

    if (req.body.purchase_quantity > availableQuantity) {
      return res.status(400).json({
        error: `Sorry... the quantity available has just changed to ${availableQuantity}.`,
      });
    }

    let { location } = Buyer_Profile.dataValues;

    if (req.body.location) {
      location = req.body.location;
    }

    productFindByPk.update({
      quantity: availableQuantity - req.body.purchase_quantity,
    });

    if (productFindByPk.dataValues.quantity === 0) {
      productFindByPk.update({
        status: 'soldout',
      });
    }

    const seller = await User.findByPk(productFindByPk.dataValues.seller, {
      include: [
        {
          model: PersonalData,
          as: 'user_personal_info',
          attributes: ['cellphone'],
        },
      ],
    });

    const randomId = uuidv4();

    const PurchaseDone = await Purchase.create({
      purchase_code: randomId,
      purchase_quantity: req.body.purchase_quantity,
      buyer: req.userId,
      product: req.body.product,
      seller: productFindByPk.dataValues.seller,
      payment_form: req.body.payment_form,
      frete_price: req.body.frete_price,
      total_price: req.body.total_price,
      purchase_location: location,
      deliver_date: req.body.frete_date,
    });

    await Email.sendMail({
      to: `${Buyer_Profile.dataValues.name} <${Buyer_Profile.dataValues.email}>`,
      subject: `C-KO PEDIDO #${randomId}`,
      template: 'purchase',
      context: {
        name: Buyer_Profile.dataValues.name,
        email: Buyer_Profile.dataValues.email,
        price: req.body.total_price,
        freteDate: req.body.freteEstimate,
        purchaseCode: randomId,
        sellerEmail: seller.dataValues.email,
        sellerName: seller.dataValues.name,
        cellpone: seller.dataValues.user_personal_info.dataValues.cellphone,
      },
    });

    return res.json({
      purchase: PurchaseDone,
      seller_info: {
        name: seller.dataValues.name,
        cellphone: seller.dataValues.user_personal_info.dataValues.cellphone,
        email: seller.dataValues.email,
      },
    });
  }

  async GetAllPurchases_Buyer(req, res) {
    const PurchasesBoughtBytheUser = await Purchase.findAll({
      where: {
        buyer: {
          [Op.eq]: req.userId,
        },
      },
      include: [
        {
          model: Product,
          as: 'purchase_product',
          attributes: [
            'id',
            'product_name',
            'category',
            'price',
            'url',
            'path',
            'status',
          ],
        },
        {
          model: User,
          as: 'user_seller',
          attributes: ['id', 'email', 'name', 'personal_info'],
        },
        {
          model: Location,
          as: 'location',
          attributes: [
            'postcode',
            'country',
            'state',
            'city',
            'neighborhood',
            'street',
            'street_number',
          ],
        },
      ],
    });

    return res.json(PurchasesBoughtBytheUser);
  }

  async GetAllPurchases_Seller(req, res) {
    const PurchasesSoldBytheUser = await Purchase.findAll({
      where: {
        seller: {
          [Op.eq]: req.userId,
        },
      },
      include: [
        {
          model: Product,
          as: 'purchase_product',
          attributes: [
            'id',
            'product_name',
            'category',
            'price',
            'url',
            'path',
            'status',
          ],
        },
        {
          model: User,
          as: 'user_buyer',
          attributes: ['email', 'name', 'personal_info'],
        },
        {
          model: Location,
          as: 'location',
          attributes: [
            'postcode',
            'country',
            'state',
            'city',
            'neighborhood',
            'street',
            'street_number',
          ],
        },
      ],
    });

    return res.json(PurchasesSoldBytheUser);
  }

  async SellsDoneByProduct(req, res) {
    const { page = 1 } = req.query;

    const PurchasesSoldBytheUser = await Purchase.findAll({
      where: {
        seller: {
          [Op.eq]: req.userId,
        },
        product: {
          [Op.eq]: req.query.id,
        },
      },
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Product,
          as: 'purchase_product',
          attributes: [
            'id',
            'product_name',
            'category',
            'price',
            'url',
            'path',
            'status',
          ],
        },
        {
          model: User,
          as: 'user_buyer',
          attributes: ['email', 'name', 'personal_info'],
        },
        {
          model: Location,
          as: 'location',
          attributes: [
            'postcode',
            'country',
            'state',
            'city',
            'neighborhood',
            'street',
            'street_number',
          ],
        },
      ],
    });

    return res.json(PurchasesSoldBytheUser);
  }
}

export default new PurchaseController();
