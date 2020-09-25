import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      country: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      neighborhood: Yup.string().required(),
      street: Yup.string().required(),
      street_number: Yup.string().required(),
      postcode: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: e.inner });
  }
};
