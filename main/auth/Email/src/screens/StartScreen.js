import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import Signin from '../Facebook/Signin'
import Login from '../Google/Login'
export default function StartScreen({ navigation }) {
  return (
    <Background>
      {/* <Logo /> */}
      <Header> bienvenue </Header>
      
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login with Email
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
      <Signin/>
      <Login/>
      
    </Background>
  )
}