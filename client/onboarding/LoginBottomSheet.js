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

export default function LoginBottomSheet(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const snapPoints = useMemo(() => ['85%'], [])

  const renderContent = () => {
    if (props.isLoginFormVisible) {
      return (
        <View>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Sign Up</Text>
            <TouchableOpacity
              style={styles.buttonX}
              onPress={props.onStartNowPress}
            >
              <Text style={styles.xButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <EmailLoginComponent
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleEmailLogin={() => props.handleEmailLogin(email, password)}
            signupCreateUser={() => props.signupCreateUser(email, password)}
            isLoginFormVisible={props.isLoginFormVisible}
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
              onPress={props.onStartNowPress}
            >
              <Text style={styles.xButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={hands_logging_in} />
          </View>
          <View style={styles.buttonContainer}>
            {Platform.OS === 'ios' && (
              <View style={styles.mb}>
                <AppleSignInButton onPress={props.onAppleButtonPress} />
              </View>
            )}
            <View style={styles.mb}>
              <GoogleSignInButton
                onPress={props.handleGoogleLogin}
                disabled={props.isSigninInProgress}
              />
            </View>
            <View style={styles.plainBtn}>
              <EmailSignInButton
                onPress={() => props.setIsLoginFormVisible(true)}
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
  scrollContent: { paddingTop: 10, paddingHorizontal: 20, paddingBottom: 50 },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
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
    width: width * 0.6,
    height: height * 0.2,
    alignSelf: 'center',
    marginBottom: 30,
  },
  image: { width: '100%', height: '100%', resizeMode: 'contain' },
  buttonContainer: { alignItems: 'center' },
  mb: { marginBottom: 15 },
  plainBtn: { width: '80%', alignItems: 'center' },
})
