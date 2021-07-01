const express = require('express');
const router = express.Router();
const QuoteController = require('./Modules/Quotes/Quote.controller');

router.post('/send_quote', send_mail);

module.exports = router;

function send_mail (req, res, next) {
    QuoteController.sendQuote(req.body)
    .then(data => data ? res.json(data) : res.sendStatus(404))
    .catch(err => next(err));
}