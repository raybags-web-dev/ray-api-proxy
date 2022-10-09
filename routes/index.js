const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');


require('dotenv').config();
const { BASE_URL, API_KEY_NAME, API_KEY_VALUE } = process.env

let cache = apicache.middleware

router.get('/v1', cache('2 minutes'), async(req, res) => {
    try {
        // search params
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        });

        const apiRes = await needle('get', `${BASE_URL}?${params}`);
        const data = apiRes.body

        // request made
        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${BASE_URL}?<params>`)
        }

        res.status(200).json(data)

    } catch (e) {
        res.status(500).json({ Success: false, Error: e.message })
    }
})



module.exports = router