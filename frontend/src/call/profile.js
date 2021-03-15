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
        <div className="App col col-lg-6">
            <h1>User Profile:</h1>
            <p>Email: {profile ? profile.email: 'no user'}</p>
            <p>Phone numbers:</p>
            <ul>
                {profile.phone_numbers ? profile.phone_numbers.map((phoneNumber) => (
                    <li>{phoneNumber.number}</li>
                )) : null}
            </ul>
            <p>Calling Plans</p>
            <ul>
                {profile.calling_plans ? profile.calling_plans.map((plan) => (
                    <li>{plan.name}</li>
                )): null}
            </ul>
        </div>
    );    
}
  
  export default Profile;
  