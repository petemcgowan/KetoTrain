import React, { useState, useMemo } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'

import hands_logging_in from '../assets/images/login_hands_logging_in_2.png'
import AppleSignInButton from './AppleSignInButton'
import GoogleSignInButton from './GoogleSignInButton'
import EmailSignInButton from './EmailSignInButton'
import EmailLoginComponent from './EmailLoginComponent'

const { height, width } = Dimensions.get('window')
const v = (percent) => Math.round((height * percent) / 100)
const buttonWidth = width * 0.88
const imageWidth = width * 0.72
const imageHeight = height * 0.24

export default function LoginBottomSheet(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailFormMode, setEmailFormMode] = useState('login') // 'login' | 'signup'
  const snapPoints = useMemo(() => ['85%'], [])

  const handleShowEmailForm = () => {
    setEmailFormMode('login')
    props.setIsLoginFormVisible(true)
  }

  const handleBackToProviders = () => {
    props.setIsLoginFormVisible(false)
  }

  const renderContent = () => {
    if (props.isLoginFormVisible) {
      return (
        <View style={styles.formWrapper}>
          <View style={[styles.panelHeader, { marginBottom: v(2) }]}>
            <Text style={styles.panelTitle}>
              {emailFormMode === 'login' ? 'Login' : 'Sign Up'}
            </Text>
            <TouchableOpacity
              style={styles.buttonX}
              onPress={handleBackToProviders}
            >
              <Text style={styles.xButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <EmailLoginComponent
            mode={emailFormMode}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSignIn={() => props.handleEmailLogin(email, password)}
            onSignUp={() => props.signupCreateUser(email, password)}
            onForgotPassword={() => props.handleForgotPasswordPress(email)}
            onSwitchMode={() =>
              setEmailFormMode((m) => (m === 'login' ? 'signup' : 'login'))
            }
          />
        </View>
      )
    } else {
      return (
        <View>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Sign In</Text>
            <TouchableOpacity
              style={styles.buttonX}
              onPress={() => props.onStartNowPress()}
            >
              <Text style={styles.xButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.imageContainer, { width: imageWidth, height: imageHeight }]}>
            <Image style={styles.image} source={hands_logging_in} />
          </View>
          <View style={styles.buttonContainer}>
            {Platform.OS === 'ios' && (
              <View style={[styles.mb, styles.buttonWrapper]}>
                <AppleSignInButton onPress={props.onAppleButtonPress} />
              </View>
            )}
            <View style={[styles.mb, styles.buttonWrapper]}>
              <GoogleSignInButton
                onPress={props.handleGoogleLogin}
                disabled={props.isSigninInProgress}
              />
            </View>
            <View style={[styles.mb, styles.buttonWrapper]}>
              <EmailSignInButton
                onPress={handleShowEmailForm}
                disabled={props.isSigninInProgress}
              />
            </View>
          </View>
        </View>
      )
    }
  }

  return (
    <BottomSheet
      ref={props.sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
    >
      <BottomSheetScrollView contentContainerStyle={styles.scrollContent}>
        {renderContent()}
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  sheetBackground: { backgroundColor: 'rgb(32, 32, 32)', borderRadius: 30 },
  scrollContent: {
    paddingTop: v(1.5),
    paddingHorizontal: 20,
    paddingBottom: v(6),
    flexGrow: 1,
  },
  formWrapper: { flex: 1, minHeight: height * 0.5 },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: v(1),
  },
  panelTitle: {
    fontSize: RFPercentage(3.7),
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  buttonX: {
    position: 'absolute',
    right: 0,
    top: 5,
    backgroundColor: 'rgb(50, 75, 98)',
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  xButtonText: {
    fontSize: RFPercentage(2.0),
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: v(3.5),
  },
  image: { width: '100%', height: '100%', resizeMode: 'contain' },
  buttonContainer: { alignItems: 'center' },
  buttonWrapper: {
    width: buttonWidth,
    alignSelf: 'center',
  },
  mb: { marginBottom: v(2) },
})
