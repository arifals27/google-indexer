const fs = require('fs');
const request = require('request');
const { google } = require('googleapis');


class Indexer{
    constructor(){
        this.keyClient = "";
        this.jwtClient = "";
    }
    async setKey(i = 1){
        return this.keyClient = require(`./service_account_${i}.json`);
    }
    async setJwt(){
        return this.jwtClient = new google.auth.JWT(
            this.keyClient.client_email,
            null,
            this.keyClient.private_key,
            ['https://www.googleapis.com/auth/indexing'],
            null
        );
    }
    async submit(url){
        await this.jwtClient.authorize(function(err, tokens) {
            if (err) {
                console.log(err);
                return;
            }
            const items = [{
                    'Content-Type': 'application/http',
                    'Content-ID': '',
                    body:
                        'POST /v3/urlNotifications:publish HTTP/1.1\n' +
                        'Content-Type: application/json\n\n' +
                        JSON.stringify({
                            url: url,
                            type: 'URL_UPDATED'
                        })
                }];

            const options = {
                url: 'https://indexing.googleapis.com/batch',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/mixed'
                },
                auth: { bearer: tokens.access_token },
                multipart: items
            };
            return new Promise((resolve, reject) => {
                request(options, (err, resp, body) => {
                    if (resp) {
                        console.log(body);
                        return resolve(resp);
                    }
                    if (err) {
                        return reject(err);
                    }
                });
            })
        });
    }

    updateConfig(data){
        return fs.writeFileSync("./config.json", JSON.stringify(data), {encoding: "utf8", flag: "w"});
    }
}

module.exports = {Indexer};