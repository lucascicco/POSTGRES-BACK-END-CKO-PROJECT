import * as Yup from 'yup';

export default async (req, res, next) => {
    try{
        const schema = Yup.object().shape({
            birthday: Yup.date().required(),
            gender: Yup.string().required(),
            identification: Yup.string().required(),
            profession: Yup.string().required(),
            cellphone: Yup.string().required()
        })
        
        await schema.validate(req.body, { abortEarly: false })

        return next();

    }catch(e){
        return res
            .status(400)
            .json({ error: 'Validation fails' , messages: e.inner })
    }
}
