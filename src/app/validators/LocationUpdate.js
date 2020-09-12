import * as Yup from 'yup';

export default async (req, res, next) => {
    try{
        const schema = Yup.object().shape({
            country: Yup.string(),
            state: Yup.string(),
            city: Yup.string(),
            neighborhood: Yup.string(),
            street: Yup.string(),
            street_number: Yup.string(),
            postcode: Yup.string()
        })

        await schema.validate(req.body, { abortEarly: false })

        return next();

    }catch(e){
        return res
            .status(400)
            .json({ error: 'Validation fails' , messages: e.inner })
    }
}
