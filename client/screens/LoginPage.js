import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'

const LoginPage = ({ navigation }) => {
  const [isSigninInProgress, setSigninInProgress] = useState(false)

  const handleGoogleLogin = async () => {
    try {
      console.log('handleGoogleLogin')
      setSigninInProgress(true)
      const hasPlayServices = await GoogleSignin.hasPlayServices()
      console.log('handleGoogleLogin, after hasPlayServices' + hasPlayServices)
      const userInfo = await GoogleSignin.signIn().catch((error) => {
        console.log('Error during Google Sign In:', error)
      })
      console.log('handleGoogleLogin , after signin')
      // Here you will get user information, you can send it to your backend server for verification
      console.log('userInfo:' + JSON.stringify(userInfo))
      navigation.navigate('MainApp')
      setSigninInProgress(false)
    } catch (error) {
      console.log('Error in handleGoogleLogin:' + error)
    }
  }

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ])
      if (result.isCancelled) {
        throw 'User cancelled the login process'
      }
      const data = await AccessToken.getCurrentAccessToken()
      if (!data) {
        throw 'Something went wrong obtaining access token'
      }
      // Here you will get user access token, you can send it to your backend server for verification
      console.log('data.accessToken:' + data.accessToken.toString())
    } catch (error) {
      console.log('Error in handleFacebookLogin:' + error)
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '534592509466-tfde9rsgmmeahtknghht7rbjt14e0m0c.apps.googleusercontent.com',
      // androidClientId:
      //   '534592509466-r0b52u6k67qqluglvd7eo6sptlsf1eqr.apps.googleusercontent.com',
      androidClientId:
        '534592509466-mla9cae97f60gjl773k5h79r5m1m51n5.apps.googleusercontent.com',
      iosClientId:
        '534592509466-emk8vddvuarhkrqhdv1qlp5rg5ddtagi.apps.googleusercontent.com',
      // offlineAccess: true,
    })
  }, [])

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleLogin}
        disabled={isSigninInProgress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LoginPage
