const express = require('express');

const app = express();

app.use(express.static('./dist/rentel-bot'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/rentel-bot/'}),
);

app.listen(process.env.PORT || 8080);