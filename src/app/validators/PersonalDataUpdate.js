import * as Yup from 'yup';

export default async (req, res, next) => {
    try{
        const schema = Yup.object().shape({
            birthday: Yup.date(),
            gender: Yup.string(),
            identification: Yup.string(),
            profession: Yup.string(),
            cellphone: Yup.string()
        })

        await schema.validate(req.body, { abortEarly: false })

        return next();

    }catch(e){
        return res
            .status(400)
            .json({ error: 'Validation fails' , messages: e.inner })
    }
}
