const hbs = require( 'express-handlebars');
const path = require('path');
const express = require('express');
const app = express();
const port = 8081;

const { queryAnimes } = require('./api');

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));

app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: './views/layouts/',
    partialsDir: './views/partials/',
    helpers: require("./helpers/handlebars.js").helpers,
}));

app.get('/', async (req, res) => {
    const animes = await queryAnimes('/trending?max=6', res);
    res.render('home', {layout: 'default', title: 'Home', animes});
});

app.get('/animes/:id', async (req, res) => {
    const animes = await queryAnimes(req.originalUrl, res);
    const { _source: { canonicalTitle }} = animes[0];
    res.render('anime', {layout: 'default', title: canonicalTitle, anime: animes[0] });
});

app.get('/not_found', async (req, res) => {
    res.render('not_found', {layout: 'default', title: '404 - Not Found' });
});


app.get('*', async (req, res) => {
    const animes = await queryAnimes(req.originalUrl, res);
    let current = 1;
    if(req.query.page) current = req.query.page;
    res.render('grid', {layout: 'default', title: 'Animes', animes, current, nbAnimes: animes.length});
});

app.listen(port, () => console.log('App listening on port : ' + port));