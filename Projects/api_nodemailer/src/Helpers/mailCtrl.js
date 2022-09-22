const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const quoteFile = 'src/Assets/email/quoteMail.html';

let readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

async function send_email(data, quote_id) {
    try {
        // confirmation data
        const client_time_zone = data.clientTimeZone;
        const email = data.email

        // utc to local time
        options = {
            timeZone: client_time_zone, // you can test with "America/New_York"
            dateStyle: 'full',
            timeStyle: 'full'
        };

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.example.com", // Add your smtp mail
            port: 465, // Add your port
            secure: true, // true for 465, false for other ports 
            auth: {
                user: 'example@mail.com', // Add your generated email user 
                pass: 'password-123' // Add your generated email password 
            },
            dkim: {
                domainName: "domain.com", // Add your domain
                keySelector: "key", // Add your key
                privateKey: "" // If your have a private key, add here
            },
            tls: {
                rejectUnauthorized: false // TLS config
            }
        });

        let replacements = {
            quoteID: quote_id,
            body: '', // Email body
        }

        // Read HTML file and edit
        readHTMLFile(quoteFile, async function (err, html) {
            let template = handlebars.compile(html);
            let htmlToSend = template(replacements);
            let mailOptions = {
                from: 'Example Team <example@mail.com>',
                to: email,
                subject: "", // Email subject
                html: htmlToSend,
                attachments: [{
                    filename: `Quote_${quote_id}.pdf`,
                    path: path.resolve(__dirname, `./../../quotes/Quote_${quote_id}.pdf`), // `quotes/Quote_${quote_id}.pdf`,
                    contentType: 'application/pdf'
                },
                {
                    filename: 'logo_sf.png',
                    path: 'src/Assets/images/logo_sf.png',
                    cid: 'imagename' 
                }]
            };
            // Enviamos el email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) console.log(error);
            });
        });

        return { status: 200, message: `Message sent: Quote ID ${quote_id}` }
    } 
    catch (e) {
        throw e; // we are catching this in the controller
    }
}

module.exports = send_email;