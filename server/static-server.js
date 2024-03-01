/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { log } = require('console');
const express = require('express');
const path = require('path');
const app = express();

const port = 3300;
const url = `http://localhost:${port}`;

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

log(`[SEO React Mission] static server start in ${url}`);

// auto open browser
const start = process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open';
require('child_process').exec(start + ' ' + url);

app.listen(port);
