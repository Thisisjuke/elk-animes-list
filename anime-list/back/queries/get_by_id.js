const get_by_id = (app, client) => {
    return app.get('/animes/:id', (req, res) => {
        const query = {
            index: 'animes',
            type: '_doc',
            body: {
                "query": {
                    "ids": {
                        "values": [req.params.id]
                    }
                }
            }
        };

        client
            .search(query)
            .then(({ body }) => {
                res.status(200).send(body.hits.hits);
            })
            .catch(console.error);
    });
};

module.exports = get_by_id;