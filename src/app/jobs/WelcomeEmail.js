import Mail from '../../lib/Mail';

class WelcomeEmail {
  get key() {
    return 'WelcomeEmail';
  }

  async handle({ data }) {
    const { name, email } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Boas-vindas.',
      template: 'welcome',
      context: {
        name,
      },
    });
  }
}

export default new WelcomeEmail();

// import CancellationMail from '..'
