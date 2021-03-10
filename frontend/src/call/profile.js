import React, {useState, useEffect} from 'react'

const Profile = () => {
    const [profile, setProfile] = useState([])

    useEffect(() => {
        fetch('https://nodebotanist.ngrok.io/profile', {
            method: 'GET'
        }).then(async function(userProfile){
            userProfile = await userProfile.json()
            setProfile(userProfile)
            console.log(userProfile) 
        })
    }, [])

    return (
        <div className="App col col-lg-3">
            <h1>User Profile:</h1>
            <p>Email: {profile ? profile.email: 'no user'}</p>
        </div>
    );    
}
  
  export default Profile;
  