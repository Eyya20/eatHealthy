import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import Signin from '././Facebook/Signin'
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
     } catch (error) {
         console.log(error)
     }
}
render() {
   return (
      <View 
      style={{flex:1,
      justifyContent:"center",
      alignItems:"center"
      }}>
      
    <Signin/>
       <GoogleSigninButton
        style={{ width: 192, height: 55 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={()=>{this.signIn()}}
        disabled={this.state.isSigninInProgress} />
    </View>
);}
};
