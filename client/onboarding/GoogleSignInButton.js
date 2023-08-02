import React from 'react'
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native'
import googleLetterIcon from '../assets/images/btn_google_light_normal_ios.png'
import { RFPercentage } from 'react-native-responsive-fontsize'

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
    backgroundColor: '#4285F4',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  text: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: RFPercentage(2.5),
  },
  icon: {
    width: 20,
    height: 20,
  },
})

export default GoogleSignInButton
