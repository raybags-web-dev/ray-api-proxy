const express = require('express');
const cors = require('cors');
const app = express();
const rateLimit = require('express-rate-limit');

// limiter
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5
})

app.use(limiter)
app.set('trust proxy', 1);

app.use('/proxy-ray-api', require('./routes/index'));


app.use(cors());
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server running on port:' + PORT)
})