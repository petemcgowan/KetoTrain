import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TextInput,
  Button,
} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
// import { AppleButton } from '@invertase/react-native-apple-authentication'
import BottomSheet from 'reanimated-bottom-sheet'
import hands_logging_in from '../assets/images/login_hands_logging_in_2.png'
import AppleSignInButton from './AppleSignInButton'
import GoogleSignInButton from './GoogleSignInButton'
import EmailSignInButton from './EmailSignInButton'
import EmailLoginComponent from './EmailLoginComponent'

const { height, width } = Dimensions.get('screen')

export default function LoginBottomSheet({
  sheetRef,
  onStartNowPress,
  handleGoogleLogin,
  onAppleButtonPress,
  isSigninInProgress,
  handleEmailLogin,
  signupCreateUser,
  handleForgotPassword,
  setIsLoginFormVisible,
  isLoginFormVisible,
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const renderContent = () => {
    if (isLoginFormVisible) {
      return (
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Sign Up</Text>
            <TouchableOpacity style={styles.buttonX} onPress={onStartNowPress}>
              <Text style={styles.xButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.imageContainer}>
            <Image style={styles.image} source={hands_logging_in}></Image>
          </View> */}
          <EmailLoginComponent
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleEmailLogin={handleEmailLogin}
            signupCreateUser={signupCreateUser}
            handleForgotPassword={handleForgotPassword}
            isLoginFormVisible={isLoginFormVisible}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Sign In</Text>
            <TouchableOpacity style={styles.buttonX} onPress={onStartNowPress}>
              <Text style={styles.xButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={hands_logging_in}></Image>
          </View>
          <View style={styles.buttonContainer}>
            {Platform.OS === 'ios' && (
              <View style={styles.appleButtonContainer}>
                <AppleSignInButton onPress={onAppleButtonPress} />
              </View>
            )}
            <View style={styles.googleButtonContainer}>
              <GoogleSignInButton
                onPress={handleGoogleLogin}
                disabled={isSigninInProgress}
              />
            </View>
            {/* {Platform.OS === 'android' && ( */}
            <View style={styles.plainButtonContainer}>
              <EmailSignInButton
                onPress={() => {
                  setIsLoginFormVisible(true)
                }}
                disabled={isSigninInProgress}
              />
            </View>
            {/* )} */}
          </View>
        </View>
      )
    }
  }

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[0, isLoginFormVisible ? height * 0.6 : height * 0.6]}
      borderRadius={10}
      renderContent={renderContent}
    />
  )
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: 'rgb(32, 32, 32)',
    height: height * 0.6,
    padding: 10,
    // justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  appleButtonContainer: {
    marginBottom: 10,
  },
  googleButtonContainer: {
    marginBottom: 10,
  },
  plainButtonContainer: {
    // backgroundColor: 'white',
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  passwordText: { fontSize: RFPercentage(2.5), borderRadius: 8 },
  emailText: { fontSize: RFPercentage(2.5), borderRadius: 8 },
  forgotButton: {
    width: '47.5%',
    marginLeft: 5,
    borderRadius: 15,
  },
  signupButton: {
    width: '47.5%',
    marginRight: 5,
    borderRadius: 15,
  },
  loginButton: {
    width: '100%',
    borderRadius: 15,
    marginBottom: 5,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonX: {
    position: 'absolute',
    right: 10,
    top: 0,
    backgroundColor: 'rgb(50, 75, 98)',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  xButtonText: {
    fontSize: RFPercentage(2.5),
    color: 'white',
    textTransform: 'uppercase',
  },
  panelTitle: {
    fontSize: RFPercentage(3.7),
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  imageContainer: {
    width: width * 0.6,
    height: height * 0.2,
    alignSelf: 'center',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
})
