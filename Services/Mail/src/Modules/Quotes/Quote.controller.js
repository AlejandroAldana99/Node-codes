'use strict'
const InvoiceGenerator = require('./../../Helpers/pdfCtrl')

module.exports = {
    sendQuote
};

async function sendQuote(newData) {
    try {
        const ig = new InvoiceGenerator(newData.Quote)
        ig.generate()
        // Guardar consulta
        // await sendEmail(newData.email, content, "Enviar");        
        return ("Message send")
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}