import React from 'react'
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import appleIcon from '../assets/images/appleIcon.png'

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
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    // width: 240,
    // height: 45,
  },
  logo: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.5),
  },
})

export default AppleSignInButton
