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
        if(config.index%200 === 0){
            config.service = config.service + 1;
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
    // cdn.api(req.params.api).then(()=> cdn.upload());
    // cdn.getImage(req.params.api).then(() => cdn.upload());
    // res.send("Hallo")

})
app.get('/favicon.ico', (req, res) => {
    res.send("Ahem");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})