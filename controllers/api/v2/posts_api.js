module.exports.index = function(req, res) {
    return res.json(200, {
        message: "List of posts V2 Api",
        posts: []
    })
}