import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      weight: Yup.string().required(),
      format: Yup.number().required(),
      length: Yup.number(),
      width: Yup.number(),
      height: Yup.number(),
      diameter: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: e.inner });
  }
};
