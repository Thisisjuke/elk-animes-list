const express = require('express');
const cors = require('cors');
const { Client } = require('es6');
const client = new Client({ node: 'http://localhost:9200' });

const get_all = require('./queries/get_all');
const search_by_word = require('./queries/search_by_word');
const search_by_trending = require('./queries/search_by_trending');
const search_by_popularity = require('./queries/search_by_popularity');
const search_by_likes = require('./queries/search_by_likes');

const app = express();
app.use(cors('*'));

get_all(app, client);
search_by_word(app, client);
search_by_trending(app, client);
search_by_popularity(app, client);
search_by_likes(app, client);

const port = 3005;
app.listen(port, () => console.log('App listening on port : ' + port));
