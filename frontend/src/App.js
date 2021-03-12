import Status from './call/status'
import CallLog from './call/call-log'
import Profile from './call/profile'

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <div className="row">
        <Profile /> 
        <Status />
      </div>
      <CallLog />
    </div>
  );
}

export default App;
