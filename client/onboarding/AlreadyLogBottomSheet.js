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
import surreal_sand_timer from '../assets/images/surreal_sand_timer.png'
import GoogleSignInButton from './GoogleSignInButton'

const { height } = Dimensions.get('screen')

/*This sheet is for those who've installed the app again on their phone, and they already have a login */

export default function AlreadyLogBottomSheet({
  sheetRef,
  clickLoginPanel,
  handleGoogleLogin,
  isSigninInProgress,
}) {
  const renderContent = () => {
    return (
      <View style={styles.panel}>
        <View style={styles.panelFooter}>
          <TouchableOpacity style={styles.button} onPress={clickLoginPanel}>
            <Text style={styles.buttonText}>CLOSE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.panelContent}>
          <Image style={styles.image} source={surreal_sand_timer}></Image>
        </View>
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>Sign In</Text>
        </View>
        <GoogleSignInButton
          onPress={handleGoogleLogin}
          disabled={isSigninInProgress}
        />
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
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red',
    alignItems: 'center',
  },
  panel: {
    backgroundColor: 'rgb(32, 32, 32)',
    height: height * 0.5,
    padding: 20,
  },
  panelHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  panelTitle: {
    fontSize: 20,
    color: 'rgb(2, 158, 147)',
    textAlign: 'center',
  },
  panelContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  panelFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(34, 34, 34)',
    padding: 10,
    marginHorizontal: 10,

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
