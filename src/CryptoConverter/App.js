const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
var currencyRates;
var topCryptos;
app.use(bodyParser.json());
const COINMARKETCAP_API_KEY = 'ccf5a8a1-e937-48f6-803c-9a8cb21504e3';
const EXCHANGE_API_BASE_URL = 'http://api.exchangeratesapi.io/v1/latest';
const CURRENCY_API_KEY = 'dfcbcdf99226cdcaba193276ddc6f533';

app.get('/top-cryptos', async (req, res) => {
    try {
        const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            params: {
                start: 1,
                limit: 100,
                convert: 'USD',
            },
            headers: {
                'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
            }
        });
        const exchangeRatesResponse = await axios.get(`${EXCHANGE_API_BASE_URL}?access_key=${CURRENCY_API_KEY}`);
        topCryptos = response.data.data;
        currencyRates = exchangeRatesResponse.data;
        res.json({ topCryptos, currencyRates });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching top cryptocurrencies' });
    }
});

app.post('/convert-currency', async (req, res) => {
    try {
        const { sourceCrypto, amount, targetCurrency, rateInUSD } = req.body;
        const amountInEuro = currencyRates.rates[targetCurrency];
        const amountInUSD = amountInEuro / currencyRates.rates['USD'];
        const convertedAmount = (amount * amountInUSD) * rateInUSD;
        res.json(convertedAmount);
    } catch (error) {
        res.status(500).json({ error: 'Error performing currency conversion' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
