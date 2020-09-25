import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => {
          return oldPassword ? field.required() : field;
        }),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: e.inner });
  }
};
