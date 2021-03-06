import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import  axios  from 'axios';
import Dashboard from '../screens/Dashboard'



export default class Login extends Component {
     constructor(props){
          super(props);
          this.state={
              isSigninInProgress:false,
              userInfo:null
          }
         GoogleSignin.configure({
             scopes: [], // what API you want to access 
             webClientId: '823247116280-g2ae2tjei3llbhjhcop2qvhablft8nt8.apps.googleusercontent.com',
             offlineAccess: true, 
             hostedDomain: '', 
             forceConsentPrompt: true,
             accountName: ''
         });
      }
signIn = async () => {
     try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
           console.log('_____userinfo',userInfo)

           this.setState({ userInfo });

           let sendBackend = await axios.post("http://192.168.43.91:3000/api/user/create",{"email":userInfo.user.email,"givenName":userInfo.user.givenName,"familyName":userInfo.user.familyName }
           )

            console.log(sendBackend.data) 
               

             }catch(error){
         console.log(error)
     }  
}

render() {
   return (
     
      
    <GoogleSigninButton
        style={{ width: '100%',
    marginVertical: 10,
    paddingVertical: 2}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}

        onPress={()=>{this.signIn()}}
        disabled={this.state.isSigninInProgress} />
  
);}
};