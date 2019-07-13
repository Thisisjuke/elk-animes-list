const search_by_trending = (app, client) => {
    return app.get('/trending', (req, res) => {
        const page = req.query.page ? req.query.page : 1;
        const from = (page - 1) * 30;
        const size = 20;

        const query = {
            index: 'animes',
            type: '_doc',
            body: {
                "from": from,
                "size": size,
                "sort": [
                    {"popularityRank": {"order": "asc"}}
                ]
            }
        };

        client
            .search(query)
            .then(({body}) => {
                res.status(200).send(body.hits.hits);
            })
            .catch(console.error);
    });
};

module.exports = search_by_trending;