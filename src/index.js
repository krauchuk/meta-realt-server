const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const regionRouter = require('./routers/region');
const localityRouter = require('./routers/locality');
const adRouter = require('./routers/ad');
const scraper = require('./scraper');

const scraperEnabled = false;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/regions', regionRouter);
app.use('/localities', localityRouter);
app.use('/ads', adRouter);

app.listen(3333, () => {
  console.log('server is running');
});

if (scraperEnabled) {
  scraper.run();
}
