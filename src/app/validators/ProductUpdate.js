import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      product_id: Yup.number().required(),
      price: Yup.number(),
      quantity: Yup.number(),
      description: Yup.string(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: e.inner });
  }
};
