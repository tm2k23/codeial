module.exports.index = function(req, res) {
    return res.json(200, {
        message: "List of posts V1 Api",
        posts: []
    })
}