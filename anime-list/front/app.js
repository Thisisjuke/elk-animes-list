const hbs = require( 'express-handlebars');
const express = require('express');
const app = express();
const port = 8081;

const { getAllAnimes } = require('./api');

app.set('view engine', 'hbs');

app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: './views/layouts/',
    partialsDir: './views/partials/'
}));

app.get('/', async (req, res) => {
    const animes = await getAllAnimes();
    res.render('home', {layout: 'default', template: 'home-template', animes});
});

app.listen(port, () => console.log('App listening on port : ' + port));