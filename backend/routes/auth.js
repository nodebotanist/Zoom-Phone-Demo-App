const axios = require('axios')

module.exports = {
    completeAuth: async function(req, res) {
        const code = req.query.code
        const keyBuffer = Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`)
        let accessToken = await axios({
            url: `https://zoom.us/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=${process.env.ZOOM_REDIRECT_URI}`,
            method: 'POST',
            headers: {
                Authorization: `Basic ${keyBuffer.toString('base64')}` 
            }
        })
        let userData = await axios({
            url: `https://api.zoom.us/v2/users/me`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken.data.access_token}`
            }
        })
        console.log(userData.data)
        //save user data to the session
        req.session.userData = {
            userId: userData.data.id,
            accessToken: accessToken.data.access_token,
            refreshToken: accessToken.data.refresh_token
        }
        res.redirect('http://localhost:3000')
    }
}