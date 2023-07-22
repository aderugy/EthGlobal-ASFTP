const express = require('express');
const body_parser = require('body-parser');

import { SismoConnect, SismoConnectVerifiedResult } from "@sismo-core/sismo-connect-server";
import { AUTHS, CLAIMS, CONFIG, SIGNATURE_REQUEST } from "./sismo-connect-config.js";

const sismoConnect = SismoConnect({ config: CONFIG });

require('dotenv').config();

const app = express();
app.use(body_parser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
})

app.post('/api/v1/verify', async (req, res) => {
    try {
        let data = '';
        let zkp;

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', async () => {
            zkp = JSON.parse(data);
            const result: SismoConnectVerifiedResult = await sismoConnect.verify(zkp, {
                auths: AUTHS,
                claims: CLAIMS,
                signature: SIGNATURE_REQUEST,
            });

            console.log('Verified !')
            console.log(result)
            return res.status(200).json(result);
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = app;