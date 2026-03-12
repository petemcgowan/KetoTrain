import React from 'react'
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native'
import googleLetterIcon from '../assets/images/btn_google_light_normal_ios.png'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')
const iconSize = Math.round(Math.min(width * 0.055, height * 0.03))
const padV = Math.round(height * 0.014)
const padH = Math.round(width * 0.07)
const gap = Math.round(width * 0.025)
const radius = Math.round(Math.min(padV * 3, 32))

const GoogleSignInButton = ({ onPress, disabled }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabledButton]}
    onPress={onPress}
    disabled={disabled}
  >
    <Image source={googleLetterIcon} style={styles.icon} />
    <Text style={styles.text}>Sign in with Google</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    borderRadius: radius,
    paddingVertical: padV,
    paddingHorizontal: padH,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  text: {
    color: '#ffffff',
    marginLeft: gap,
    fontSize: RFPercentage(2.5),
  },
  icon: {
    width: iconSize,
    height: iconSize,
  },
})

export default GoogleSignInButton
