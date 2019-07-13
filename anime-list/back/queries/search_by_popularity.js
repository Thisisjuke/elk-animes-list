const search_by_popularity = (app, client) => {
    return app.get('/popularity', (req, res) => {
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
};

module.exports = search_by_popularity;