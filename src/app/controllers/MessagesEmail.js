/* eslint-disable prettier/prettier */
import Email from '../../lib/Mail';
import User from '../models/user';

class MessagesEmail {
  async sendMessageSeller(req, res) {
    const {
      name,
      email,
      purchaseCode,
      message,
    } = req.body;

    const user = await User.findByPk(req.userId);

    await Email.sendMail({
      to: `${name} <${email}>`,
      subject: `#${purchaseCode} - RECADO`,
      template: 'messagebtos',
      context: {
        name,
        email,
        purchaseCode,
        buyerName: user.dataValues.name,
        buyerEmail: user.dataValues.email,
        message,
      },
    });

    return res.json({
      message: 'Message has been sent',
    });
  }

  async sendMessageBuyer(req, res) {
    const {
      name,
      email,
      purchaseCode,
      message,
    } = req.body;

    const user = await User.findByPk(req.userId);

    await Email.sendMail({
      to: `${name} <${email}>`,
      subject: `#${purchaseCode} - RECADO`,
      template: 'messagestob',
      context: {
        name,
        email,
        purchaseCode,
        sellerEmail: user.dataValues.email,
        sellerName: user.dataValues.name,
        message,
      },
    });

    return res.json({
      message: 'Message has been sent',
    });
  }
}

export default new MessagesEmail();
