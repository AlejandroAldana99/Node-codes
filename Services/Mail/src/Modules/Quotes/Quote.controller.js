'use strict'
const QuoteGenerator = require('./../../Helpers/pdfCtrl');
const sendEmail = require('./../../Helpers/mailCtrl');

//schema indexes
const {
    Quotetable
} = require('./../../Helpers/quote_db');

module.exports = {
    sendQuote
};

async function sendQuote(newData) {
    try {
        newData.taxes = (newData.subtotal * newData.sales_tax);
        newData.total = newData.subtotal + newData.taxes;
        // Save data
        var saved = saveQuote(newData);
        if (!saved) return ("Data can't be saved")
        // File Generation
        const qg = new QuoteGenerator(newData)
        qg.generate()
        // Send email
        var email_status = await sendEmail(newData, newData.quoteID);        
        return email_status
        // return ("Message Sent");
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

async function saveQuote(quoteData) {
    try {
        const newQuote = new Quotetable(quoteData);
        const q = await newQuote.save();
        if (!q) return false;
        return true;
    } 
    catch (e) {
        throw e;
    }
}