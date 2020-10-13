/* eslint-disable prettier/prettier */
import Email from '../../lib/Mail';
import User from '../models/user';

class MessagesEmail {
  async sendMessageSeller(req, res) {
    try{
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

    }catch(e){
      return res.status(400).json({
        message: 'it failed'
      })
    }

  }

  async sendMessageBuyer(req, res) {
    try{
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

    }catch(e){
      return res.status(400).json({
        message: 'it failed'
      })
    }
  }
}

export default new MessagesEmail();
