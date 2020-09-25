import Order from '../models/order';
import Products from '../models/products';

class OrderController {
  async store(req, res) {
    const { products, ...data } = req.body;

    const order = await Order.create(data);

    console.log(products);

    if (products && products.length > 0) {
      await order.setProducts(products);
    }

    return res.json(order);
  }

  async get(req, res) {
    const orders = await Order.findAll({
      include: [
        {
          model: Products,
          as: 'products',
          through: {
            attributes: [],
          },
        },
      ],
    });

    return res.json(orders);
  }
}

export default new OrderController();
