function Profile() {        
        const userProfile = fetch('https://nodebotanist.ngrok.io/profile', {
        method: 'GET'
    }).then(async function(userProfile){
        userProfile = await userProfile.text()
        console.log(userProfile)    
    })
    return (
        <div className="App col col-lg-3">
        <h1>User Profile:</h1>
        </div>
    );
}
  
  export default Profile;
  