import Mail from '../../lib/Mail';

class MessageToBuyer {
  get key() {
    return 'MessageToBuyer';
  }

  async handle({ data }) {
    const {
      name,
      email,
      purchaseCode,
      sellerEmail,
      sellerName,
      message,
    } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: `#${purchaseCode} - RECADO`,
      template: 'messagestob',
      context: {
        name,
        purchaseCode,
        sellerEmail,
        sellerName,
        message,
      },
    });
  }
}

export default new MessageToBuyer();
