
import React, {useState, useEffect} from 'react'

const CallLog = () => {
    const [callLog, setCallLog] = useState([])

    useEffect(() => {
        fetch('https://nodebotanist.ngrok.io/log', {
            method: 'GET'
        }).then(async function(callLog){
            callLog = await callLog.json()
            setCallLog(callLog)
            console.log(callLog) 
        })
    }, [])

    return (
      <div className="App col col-lg-3">
        <h1>Call Log:</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Direction</th>
              <th>Call Number</th>
              <th>Caller/Callee</th>
            </tr>
            {callLog.call_logs ? callLog.call_logs.map((call) => (
              <tr>
                <td>{call.date_time}</td>
                <td>{call.direction}</td>
                <td>{call.direction == 'outbound' ? call.callee_number : call.caller_number}</td>
                <td>{call.direction == 'outbound' ? call.callee_name : call.caller_name}</td>
              </tr>
            )): null}
          </thead>
        </table>
      </div>
    )
  }
  
  export default CallLog;  
