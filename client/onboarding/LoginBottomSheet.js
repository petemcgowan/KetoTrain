import React, { useEffect } from 'react'
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
// import { AppleButton } from '@invertase/react-native-apple-authentication'
import AppleSignInButton from './AppleSignInButton'
import BottomSheet from 'reanimated-bottom-sheet'
import hands_logging_in from '../assets/images/login_hands_logging_in_2.png'
import GoogleSignInButton from './GoogleSignInButton'

const { height, width } = Dimensions.get('screen')

export default function LoginBottomSheet({
  sheetRef,
  onStartNowPress,
  handleGoogleLogin,
  onAppleButtonPress,
  isSigninInProgress,
}) {
  useEffect(() => {
    // console.log('LoginBottomSheet, useEffect')
  }, [])

  const renderContent = () => {
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
          {/* <TouchableOpacity
            onPress={() => {
              console.log('alternate button pressed!')
              onAppleButtonPress()
            }}
          >
            <Text>Test Apple Sign In</Text>
          </TouchableOpacity> */}
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
        </View>
      </View>
    )
  }

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[0, height * 0.6]}
      borderRadius={10}
      renderContent={renderContent}
    />
  )
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: 'rgb(32, 32, 32)',
    height: height * 0.6,
    padding: 20,
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  appleButtonContainer: {
    marginBottom: 10,
  },
  googleButtonContainer: {
    marginBottom: 10,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
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
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: width * 0.7,
    height: height * 0.25,
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
})
