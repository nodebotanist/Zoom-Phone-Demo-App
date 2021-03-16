const redis = require('redis')

let redisClient = redis.createClient({
    host: 'redis'
}) 

module.exports = {
    process: (req, res) => {
        console.log(req.session)
        console.log('event recieved:', req.body)
        switch(req.body.event){
            case 'phone.caller_ringing':
                console.log('phone ringing')
                redisClient.set('event', 'caller_ringing')
                break
            case 'phone.callee_ended':
                console.log('call ended (callee)')
            case 'phone.caller_ended':
                console.log('call ended (caller)')
                redisClient.set('event', 'none')
                break
            case 'phone.caller_connected':
            case 'phone.callee_answered':
                console.log('call connected')
                redisClient.set('event', 'connected')
                break
        }
        res.send()
    },
    current: (req, res) => {
        redisClient.get('event', (err, event) => {
            console.log(event)
            res.send(JSON.stringify({
                event: event || 'none'
            }))
        })

    }
}