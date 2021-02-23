let axios = require('axios')

module.exports = {
    profile: async function (req, res) {
        if(!req.session || !req.session.userData || !req.session.userData.accessToken){
            console.log('No access token on session')
            res.send("error-- no access token")
        }
        
        let callProfile = await axios({
            url: `https://api.zoom.us/v2/phone/users/${req.session.userData.userId}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${req.session.userData.accessToken}`
            }
        })

        res.send(callProfile.data)
    }
}