const axios = require('axios')

module.exports = {
    completeAuth: async function(req, res) {
        const code = req.query.code
        console.log(code)
        const keyBuffer = Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`)
        let accessToken = await axios({
            url: `https://zoom.us/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=${process.env.ZOOM_REDIRECT_URI}`,
            method: 'post',
            headers: {
                Authorization: `Basic ${keyBuffer.toString('base64')}` 
            }
        })
        console.log(accessToken.data)
        res.send('success')
    }
}