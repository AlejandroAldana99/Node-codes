const PDFGenerator = require('pdfkit')
const fs = require('fs')
const path = require('path');
const { fontSize, text } = require('pdfkit');

class QuoteGenerator {
    constructor(invoice) {
        this.invoice = invoice
    }

    generateHeaders(doc) {
        const billingAddress = this.invoice.address;
        const imgPath = __dirname + "/../Assets/images/logo_sf.png";
        var quote_to = `To: `;

        if (this.invoice.contact_name) {
            quote_to = quote_to + `${this.invoice.contact_name}`;
        }
        if (this.invoice.company) {
            quote_to = quote_to + `\n     ${this.invoice.company}`;
        }
        if (billingAddress.street) {
            quote_to = quote_to + `\n     ${billingAddress.street}`;
        }
        if (billingAddress.city && billingAddress.state && billingAddress.postalCode) {
            quote_to = quote_to + `\n     ${billingAddress.city}, ${billingAddress.state}, ${billingAddress.postalCode}`;
        }
        if (this.invoice.phone) {
            quote_to = quote_to + `\n     Phone: ${this.invoice.phone}`;
        }
        
        doc
            .image(imgPath, 50, 50, {fit: [50,50]})
            .fillColor('#000')
            .fontSize(20)
            .text('Quote', 275, 50, {align: 'right'})
            .moveDown()
            .fontSize(10)
            .text(`Quote Number: ${this.invoice.quoteID}`, {align: 'right'})
            .text(`Date: ${this.invoice.prepared_date}`, {align: 'right'})
            .moveDown()
            .text(`Expiration date: ${this.invoice.expiration_date}`, {align: 'right'})
            .moveDown();
        doc
            .fillColor('#000')
            .fontSize(15)
            .text('Company Name', 50, 110, {align: 'left'})
            .fontSize(10)
            .text('Company Slogan', )
            .moveDown()
            .text('Address\nPhone: 000 000 0000\nEmail: example@mail.com', {align: 'left'})
            .moveDown();
        doc
            .fillColor('#000')
            .fontSize(10)
            .text(quote_to, {align: 'left'})
            .moveDown();
    
        const beginningOfPage = 50
        const endOfPage = 550

        doc.moveTo(beginningOfPage,270)
            .lineTo(endOfPage,270)
            .stroke()
    }

    generateTable(doc) {
        const beginningOfPage = 50
        const endOfPage = 550
        var tableTop = 280
        const personX = 50
        const jobX = 175
        const paymentX = 300
        const dateX = 425

        doc
            .fontSize(10)
            .text('Sales Person', personX, tableTop, {bold: true})
            .text('Job', jobX, tableTop)
            .text('Payment Method', paymentX, tableTop)
            .text('Due Date', dateX, tableTop)
        doc
            .fontSize(10)
            .text(`${this.invoice.contact}`, personX, tableTop + 15)
            .text(``, jobX, tableTop + 15)
            .text(`${this.invoice.payment}`, paymentX, tableTop + 15)
            .text(`${this.invoice.prepared_date}`, dateX, tableTop + 15)

        doc.moveTo(beginningOfPage,330)
            .lineTo(endOfPage,330)
            .stroke()

        tableTop = 340
        const itemCodeX = 50
        const serviceX = 65
        const typeX = 125
        const descriptionX = 200
        const usdX = 450
        const mxnX = 500

        doc
            .fontSize(10)
            .text('ID', itemCodeX, tableTop, {bold: true})
            .text('Service', serviceX, tableTop)
            .text('Type', typeX, tableTop)
            .text('Description', descriptionX, tableTop)
            .text('USD', usdX, tableTop)
            .text('MXN', mxnX, tableTop)

        const items = this.invoice.selected_services
        let i = 0
        for (i = 0; i < items.length; i++) {
            const item = items[i]
            const y = tableTop + 25 + (i * 60)
            var itemCode = i + 1;

            doc
                .fontSize(10)
                .text(itemCode, itemCodeX, y)
                .text(item.service, serviceX, y)
                .text(item.service_type, typeX, y)
                .text(item.description, descriptionX, y, {
                    height: 60,
                    width: 245,
                  })
                .text(`$ ${item.price_usd}`, usdX, y)
                .text(`$ ${item.price_mxn}`, mxnX, y)
        }

        var subtotal = this.invoice.subtotal;
        var taxes = this.invoice.taxes;
        var total = this.invoice.total;

        doc 
            .fontSize(10)
            .text('Subtotal: ', usdX, 550)
            .text('Sales Tax: ', usdX, 565)
            .text('Total: ', usdX, 580)
            .text(`$ ${subtotal}`, mxnX, 550)
            .text(`$ ${taxes}`, mxnX, 565)
            .text(`$ ${total}`, mxnX, 580)
    }

    generateFooter(doc) {
        const message = '< Ending message >';
        const beginningOfPage = 50
        const endOfPage = 550

        doc
            .fontSize(10)
            .text(`Quotation prepared by: ${this.invoice.preparer}`, 50, 610, {align: 'left'})
            .text(message)
            .text('To accept this quotation, sign here and return: ___________________________________________________', {align:'center'})
        doc.moveTo(beginningOfPage,690)
            .lineTo(endOfPage,690)
            .stroke()
        doc
            .fontSize(15)
            .text(`THANK YOU FOR YOUR BUSINESS!`, 50, 700, {align: 'center'})
    }

    generate() {
        let theOutput = new PDFGenerator 
        const fileName = `./quotes/Quote_${this.invoice.quoteID}.pdf` //`Quote_${this.invoice.quoteID}.pdf`
        // pipe to a writable stream which would save the result into the same directory
        theOutput.pipe(fs.createWriteStream(fileName))
        this.generateHeaders(theOutput)
        theOutput.moveDown()
        this.generateTable(theOutput)
        this.generateFooter(theOutput)
        // write out file
        theOutput.end()
    }
}

module.exports = QuoteGenerator