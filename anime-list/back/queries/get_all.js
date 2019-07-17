const get_all = (app, client) => {
    return app.get('/animes', (req, res) => {
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
            .catch(() => {
                return res.status(500)
            });
    });
};

module.exports = get_all;