require('dotenv').config()
import nodemailer   from "nodemailer";
import fs           from "fs";
import handlebars   from "handlebars";

async function createTrasporter() {
    let transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        host: process.env.HOST_MAIL,
        port: process.env.PORT_MAIL
    });

    return transporter;
}

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

// email sender function
const sendEmail = async (toEmail, content, type) => {
    try {
        // Definimos el transporter
        let teme;
        let filePath;
        let replacements;
        let transporter = await createTrasporter();
        // let transporter = nodemailer.createTransport({
        //     service: process.env.SERVICE,
        //     host: 'smtp.gmail.com',
        //     port: 465,
        //     auth: {
        //         user: process.env.USER,
        //         pass: process.env.PASS
        //     }
        // });

        switch (type) {
            case "Recuperar":
                filePath = 'src/Mail/recoverEmail.html';
                teme = 'Recupera tu contraseña';
                replacements = {
                    name: content.name,
                    cname: process.env.APP_NAME,
                    mail: process.env.USER,
                    url: 'http://localhost:3000/password-change?token=' + content.token
                }
                break;
            case "Invitar":
                filePath = 'src/Mail/inviteEmail.html';
                teme = 'Haz sido invitado';
                replacements = {
                    cname: process.env.APP_NAME,
                    name: content.name,
                    password: content.password,
                    url: 'http://localhost:3000/login?email=' + content.email
                };
                break;
            case "Enviar":
                filePath = 'src/Mail/sendEmail.html';
                teme = content.asunto;
                content.cname = process.env.APP_NAME;
                replacements = content;
                break;
            default:
                break;
        }

        // Read HTML file and edit
        readHTMLFile(filePath, function (err, html) {
            let template = handlebars.compile(html);
            let htmlToSend = template(replacements);
            let mailOptions = {
                from: '"Ventatec" <noreplay@ventatec.com>',
                to: toEmail,
                subject: teme,
                html: htmlToSend,
            };
            // Enviamos el email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
            });
        });
    }
    catch (err) {
        Console.log(err);
    }
}

export default sendEmail;