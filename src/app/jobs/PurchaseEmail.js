import Mail from '../../lib/Mail';

class PurchaseEmail{
    get key(){
        return 'PurchaseEmail';
    }

    async handle({ data }){
        const { name, email, purchaseCode, sellerEmail, sellerName, cellpone} = data;
        
        await Mail.sendMail({
            to: `${name} <${email}>`,
            subject: `C-KO PEDIDO #${purchaseCode}`,
            template: 'purchase',
            context: {
                name,
                email,
                purchaseCode,
                sellerEmail, 
                sellerName,
                cellpone
            }
        })
    }
}

export default new PurchaseEmail();

// import CancellationMail from '..'

