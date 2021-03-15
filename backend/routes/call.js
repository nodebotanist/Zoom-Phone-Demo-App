let axios = require('axios')
let jwt = require('jsonwebtoken')

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
    },
    log: async function (req, res) {
        if(!req.session || !req.session.userData || !req.session.userData.accessToken){
            console.log('No access token on session')
            res.send("error-- no access token")
        }
        
        let callLog = await axios({
            url: `https://api.zoom.us/v2/phone/users/${req.session.userData.userId}/call_logs?from=2020-01-01`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${req.session.userData.accessToken}`
            }
        })

        // Add Phone links to target
        callLog.data.call_logs.forEach((call) => {
            numberToCall = call.direction === 'incoming' ? call.caller_number : call.callee_number
            numberToCall = numberToCall.replace('+', '')
            console.log(numberToCall)

            const tokenBody = {
                iss: process.env.ZOOM_CLIENT_ID,
                iat: Date.now(),
                exp: Date.now() + 60*60*1000,
                oid: numberToCall,
                uid: req.session.userData.userId
            }

            const token = jwt.sign(tokenBody, process.env.ZOOM_CLIENT_SECRET)

            call.callURL = `zoomphonecall://${numberToCall}?cat=seccall&token=${token}`
        })
    
        res.send(callLog.data)
    }
}