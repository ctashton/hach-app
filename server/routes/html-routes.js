module.exports = function(app) {
    app.get(`/hello`, function(req, res){
        res.send(`Hello from server!`)
    })
}