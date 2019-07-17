const search_by_popularity = (app, client) => {
    return app.get('/popularity', (req, res) => {
        const page = req.query.page ? req.query.page : 1;
        const from = (page -1) * 30;
        let size = 20;
        req.query.max ? size=4 : null;
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
            .catch(() => {
                return res.status(500)
            });
    });
};

module.exports = search_by_popularity;