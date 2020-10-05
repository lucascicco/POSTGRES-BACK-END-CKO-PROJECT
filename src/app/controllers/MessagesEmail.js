import Email from '../../lib/Mail';

class MessagesEmail {
  async sendMessageSeller(req, res) {
    const {
      name,
      email,
      purchaseCode,
      buyerName,
      buyerEmail,
      message,
    } = req.body;

    console.log(req.body);
    await Email.sendMail({
      to: `${name} <${email}>`,
      subject: `#${purchaseCode} - RECADO`,
      template: 'messagebtos',
      context: {
        name,
        email,
        purchaseCode,
        buyerName,
        buyerEmail,
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
      sellerEmail,
      sellerName,
      message,
    } = req.body;

    await Email.sendMail({
      to: `${name} <${email}>`,
      subject: `#${purchaseCode} - RECADO`,
      template: 'messagestob',
      context: {
        name,
        email,
        purchaseCode,
        sellerEmail,
        sellerName,
        message,
      },
    });

    return res.json({
      message: 'Message has been sent',
    });
  }
}

export default new MessagesEmail();
