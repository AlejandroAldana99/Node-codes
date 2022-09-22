/* Manager for any request to awovcw7p76 */
import http from 'https';

const getEntity = async (id) => {
    try {
        let response = httprequest(id).then((data) => {
            if (data.data) return data;
            else return null;
        });
        return response;
    }
    catch (err) {
        console.error("[entityManager -> getEntity] ", err);
        return null;
    }
}

function httprequest(id) {
    return new Promise((resolve, reject) => {
        const options = {
            host: process.env.HOST,
            path: `/${process.env.ENVI}/${process.env.PATH}/${id}`,
            method: 'GET'
        };
        const req = http.request(options, (res) => {
            let body = [];
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', (e) => {
            reject(e.message);
        });
        // send the request
       req.end();
    });
}

export default getEntity;