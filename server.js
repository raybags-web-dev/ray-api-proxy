const express = require('express');
const cors = require('cors');
const app = express();
const rateLimit = require('express-rate-limit');



app.use(express.static("public"));

// limiter
const limiter = rateLimit({
    windowMs: 10 * 90 * 1000,
    max: 10
})

app.use(limiter)
app.set('trust proxy', 1);

app.use('/', require('./routes/index'));


app.use(cors());
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server running on port:' + PORT)
})