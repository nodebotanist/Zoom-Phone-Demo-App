module.exports = {
    completeAuth: function(req, res) {
        const code = req.query.code
        console.log(code)
        // get access token here
        res.send('success')
    }
}