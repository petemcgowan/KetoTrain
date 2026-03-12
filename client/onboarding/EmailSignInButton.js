import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')
const iconSize = Math.round(Math.min(width * 0.055, height * 0.028))
const padV = Math.round(height * 0.014)
const padH = Math.round(width * 0.07)
const gap = Math.round(width * 0.025)
const radius = Math.round(Math.min(padV * 3, 32))

const EmailSignInButton = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome6
          name="envelope"
          size={iconSize}
          color="white"
          iconStyle="solid"
        />
      </View>
      <Text style={styles.text}>Sign in with Email</Text>
    </TouchableOpacity>
  )
}

export default EmailSignInButton

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#555555',
    borderRadius: radius,
    paddingVertical: padV,
    paddingHorizontal: padH,
  },
  iconWrapper: { marginRight: gap },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.5),
  },
  disabled: { opacity: 0.6 },
})
