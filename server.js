const express = require('express');

const app = express();

app.use(express.static('./dist/rentel-bot-conf'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/rentel-bot-conf/'}),
);

app.listen(process.env.PORT || 8080);