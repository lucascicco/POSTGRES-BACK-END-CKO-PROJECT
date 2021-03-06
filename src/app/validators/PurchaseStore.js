import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      product: Yup.number().required(),
      purchase_quantity: Yup.number().required(),
      payment_form: Yup.string().required(),
      frete_price: Yup.number().required(),
      total_price: Yup.number().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: e.inner });
  }
};
