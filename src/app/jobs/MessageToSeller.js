import Mail from '../../lib/Mail';

class MessageToSeller {
  get key() {
    return 'MessageToSeller';
  }

  async handle({ data }) {
    const { name, email, purchaseCode, buyerEmail, buyerName, message } = data;

    await Mail.sendMail({
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
  }
}

export default new MessageToSeller();
