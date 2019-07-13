const express = require('express');
const cors = require('cors');
const { Client } = require('es6');
const client = new Client({ node: 'http://localhost:9200' });

const app = express();
app.use(cors('*'));

app.get('/search', (req, res) => {
    const page = req.query.page ? req.query.page : 1;
    const from = (page -1) * 30;
    const size = 20;

    const query = {
        index: 'animes',
        type: '_doc',
        body: {
            "from" : from,
            "size" : size,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match_all" : {},
                        }
                    ]
                }
            }
        }
    };

    req.query.status ? query.body.query.bool.must.push({ "term":  { "status": { "value": req.query.status } }}) : null;
    req.query.age ? query.body.query.bool.must.push({ "term":  { "ageRating": { "value": req.query.age } }}) : null;

    client
        .search(query)
        .then(({ body }) => {
            res.status(200).send(body.hits.hits);
        })
        .catch(console.error);
});

app.get('/search/:word', (req, res) => {

    const query = {
        index: 'animes',
        type: '_doc',
        body: {
            query: {
                bool: {
                    must: [
                        {
                            multi_match: {
                                query: req.params.word,
                                operator: 'or',
                                fuzziness: 'auto',
                                fields: ['titles.en', 'titles.ja_jp']
                            }
                        }
                    ]
                }
            }
        }
    };

    req.query.status ? query.body.query.bool.must.push({ "term":  { "status": { "value": req.query.status } }}) : null;
    req.query.age ? query.body.query.bool.must.push({ "term":  { "ageRating": { "value": req.query.age } }}) : null;

    client
        .search(query)
        .then(({ body }) => {
          res.status(200).send(body.hits.hits);
        })
        .catch(console.error);
});

app.get('/trending', (req, res) => {
    const page = req.query.page ? req.query.page : 1;
    const from = (page -1) * 30;
    const size = 20;

    const query = {
        index: 'animes',
        type: '_doc',
        body: {
            "from" : from,
            "size" : size,
            "sort": [
                { "popularityRank":   { "order": "asc" }}
            ]
        }
    };

    client
        .search(query)
        .then(({ body }) => {
            res.status(200).send(body.hits.hits);
        })
        .catch(console.error);
});

app.get('/popularity', (req, res) => {
    const page = req.query.page ? req.query.page : 1;
    const from = (page -1) * 30;
    const size = 20;
    client
        .search({
            index: 'animes',
            type: '_doc',
            body: {
                "from" : from,
                "size" : size,
                "sort": [
                    { "ratingRank":   { "order": "asc" }}
                ]
            }
        })
        .then(({ body }) => {
            res.status(200).send(body.hits.hits);
        })
        .catch(console.error);
});

app.get('/likes', (req, res) => {
    const page = req.query.page ? req.query.page : 1;
    const from = (page -1) * 30;
    const size = 20;
    client
        .search({
            index: 'animes',
            type: '_doc',
            body: {
                "from" : from,
                "size" : size,
                "sort": [
                    { "favoritesCount":   { "order": "asc" }}
                ]
            }
        })
        .then(({ body }) => {
            res.status(200).send(body.hits.hits);
        })
        .catch(console.error);
});


const port = 3005;
app.listen(port, () => console.log('App listening on port : ' + port));
