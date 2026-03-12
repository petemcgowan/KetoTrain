import React from 'react'
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import appleIcon from '../assets/images/appleIcon.png'

const { width, height } = Dimensions.get('window')
const iconSize = Math.round(Math.min(width * 0.055, height * 0.03))
const padV = Math.round(height * 0.014)
const padH = Math.round(width * 0.07)
const gap = Math.round(width * 0.025)
const radius = Math.round(Math.min(padV * 3, 32))

const AppleSignInButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={appleIcon} style={styles.logo} />
      <Text style={styles.text}>Sign in with Apple</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: radius,
    paddingVertical: padV,
    paddingHorizontal: padH,
  },
  logo: {
    marginRight: gap,
    width: iconSize,
    height: iconSize,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.5),
  },
})

export default AppleSignInButton
