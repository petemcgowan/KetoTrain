import React, { useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native'

import BottomSheet from 'reanimated-bottom-sheet'
import hands_logging_in from '../assets/images/login_hands_logging_in_2.png'
import GoogleSignInButton from './GoogleSignInButton'

import { GoogleSigninButton } from '@react-native-google-signin/google-signin'

const { height, width } = Dimensions.get('screen')

export default function LoginBottomSheet({
  sheetRef,
  onStartNowPress,
  handleGoogleLogin,
  isSigninInProgress,
}) {
  useEffect(() => {
    console.log('LoginBottomSheet, useEffect')
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
        <View style={styles.panelFooter}>
          {/* <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            style={{ width: 312, height: 48, textAlign: 'center' }}
            onPress={handleGoogleLogin}
            disabled={isSigninInProgress}
          /> */}
          <GoogleSignInButton
            onPress={handleGoogleLogin}
            disabled={isSigninInProgress}
          />
        </View>
      </View>
    )
  }

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[0, height * 0.5]}
      borderRadius={10}
      renderContent={renderContent}
    />
  )
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: 'rgb(32, 32, 32)',
    height: height * 0.5,
    padding: 20,
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  panelContent: {
    flexDirection: 'row',
    height: height * 0.5,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 18,
    color: 'white',
    textTransform: 'uppercase',
  },
  panelTitle: {
    // justifyContent: 'center',
    // alignItems: 'center',
    fontSize: 26,
    fontWeight: '600',
    // color: 'rgb(2, 158, 147)',
    color: 'white',
    textAlign: 'center',
  },
  panelFooter: {
    flexDirection: 'row',
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
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(34, 34, 34)',
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 20,

    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Elevation for Android
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textTransform: 'uppercase',
  },
})
