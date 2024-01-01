import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyConverter.css';

// const API_BASE_URL = 'http://localhost:4000/';
const API_BASE_URL = 'https://crypto-calculator-api.onrender.com/'

const CurrencyConverter = () => {
    const [cryptos, setCryptos] = useState([]);
    const [sourceCrypto, setSourceCrypto] = useState('');
    const [amount, setAmount] = useState('');
    const [targetCurrency, setTargetCurrency] = useState(['USD']);
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [error, setError] = useState('');
    const [rateInUSD, setRateInUSD] = useState('');
    const [currencyCodes, setCurrencyCodes] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}top-cryptos`)
            .then(response => {
                setCryptos(response.data.topCryptos);
                const codes = Object.keys(response.data.currencyRates.rates);
                setCurrencyCodes(codes);
            })
            .catch(error => {
                setError('Error fetching cryptocurrencies');
            });
    }, []);

    useEffect(() => {
    }, [targetCurrency]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post(`${API_BASE_URL}convert-currency`, {
            'sourceCrypto': sourceCrypto,
            'amount': amount,
            'targetCurrency': targetCurrency,
            'rateInUSD': rateInUSD
        })
        .then(response => {
            setConvertedAmount(response.data);
        })
        .catch(error => {
            setError('Error performing currency conversion');
        });
    };

    const handleCryptoChange = (selectedSymbol) => {
        const selectedCrypto = cryptos.find(crypto => crypto.symbol === selectedSymbol);
        setRateInUSD(selectedCrypto.quote.USD.price);
    };

    return (
        <div>
            <h1>Crypto Currency Converter</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="sourceCrypto">Source Cryptocurrency</label>
                <select id="sourceCrypto" value={sourceCrypto} onChange={(e) => {setSourceCrypto(e.target.value); handleCryptoChange(e.target.value)}} required>
                    <option value="">Select Cryptocurrency</option>
                    {cryptos.map(crypto => (
                        <option key={crypto.symbol} value={crypto.symbol}>{crypto.name}</option>
                    ))}
                </select>
                <br />
                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} min="0" required />
                <br />
                <label htmlFor="targetCurrency">Target Currency</label>
                <select id="targetCurrency" value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    {currencyCodes.map(code => (
                        <option key={code} value={code}>{code}</option>
                    ))}
                </select>
                <br />
                {convertedAmount && (
                    <label htmlFor="convertedamount">Rate in {targetCurrency}</label>
                )}
                {convertedAmount && (
                    <input type="text" id="convertedamount" value={convertedAmount} onChange={(e) => setAmount(e.target.value)} min="0" required />
                )}
                <br />
                <input type="submit" value="Convert" /> 
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default CurrencyConverter;
