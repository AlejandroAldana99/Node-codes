'use strict'
const InvoiceGenerator = require('./../../Helpers/pdfCtrl')

const invoiceData = {
    addresses: {
        shipping: {
            name: 'Darian Harrison',
            address: '350 Independencia',
            city: 'León',
            state: 'Gto',
            country: 'MX',
            postalCode: 37370
        },
        billing: {
            name: 'Darian Harrison',
            address: '350 Independencia',
            city: 'León',
            state: 'Gto',
            country: 'MX',
            postalCode: 37370
        }
    },
    memo: 'Contact customer.',
    items: [{
            itemCode: 1,
            description: 'Service A',
            quantity: 1,
            price: 6000,
            amount: 6000
    }, {
            itemCode: 2,
            description: 'Service B',
            quantity: 1,
            price: 2000,
            amount: 2000
        }
    ],
    subtotal: 8000,
    paid: 0,
    invoiceNumber: 1234,
    dueDate: 'July 01, 2021'
}

module.exports = {
    sendQuote
};


async function sendQuote(newData) {
    try {
        let content = {
            asunto: newData.affair,
            cuerpo: newData.body
        };
        
        const ig = new InvoiceGenerator(invoiceData)
        ig.generate()
        // await sendEmail(newData.email, content, "Enviar");        
        return ("Message send")
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}