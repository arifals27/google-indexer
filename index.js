const express = require('express')
const app = express()
const port = 3000
const prog = require("./indexer.js");
const Indexer = new prog.Indexer();
const config = require('./config.json');
const limitService = 5;

app.get('/submit/:url(*)', async (req, res) => {
    try {
        await Indexer.setKey(config.service);
        await Indexer.setJwt();
        await Indexer.submit(req.params.url)
            .then(async result => {
                res.send(await result)
            });

        config.index = config.index + 1;
        //limit google indexing is 200
        if(config.index%200 === 0){
            config.service = config.service + 1;
            // limitService is count from file service_account_$i.json
            // if reach maximum, will reset again from 1
            if(config.service > limitService){
                config.service = 1;
            }
        }

        Indexer.updateConfig(config);
    } catch(e) {
        // catch errors and send error status
        console.log(e);
        res.sendStatus(500);
    }

})
app.get('/reset', (req, res) => {
    // need to reset from 1 again
    // you can use cron to reset this
    config.service = 1;
    config.index = 1;
    Indexer.updateConfig(config);
    res.send("Terseret");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
