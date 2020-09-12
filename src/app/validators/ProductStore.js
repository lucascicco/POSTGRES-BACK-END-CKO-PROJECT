import * as Yup from 'yup';

export default async (req, res, next) => {
    try{
        const schema = Yup.object().shape({
            product_name: Yup.string().required(),
            category: Yup.string().required(),
            price: Yup.number().required(),
            quantity: Yup.number().required(),
            description: Yup.string().required(),
        })

        await schema.validate(req.body, { abortEarly: false })

        return next();

    }catch(e){
        return res
            .status(400)
            .json({ error: 'Validation fails' , messages: e.inner })
    }
}
