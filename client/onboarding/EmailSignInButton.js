import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { RFPercentage } from 'react-native-responsive-fontsize'

const EmailSignInButton = ({ onPress, disabled }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabledButton]}
    onPress={onPress}
    disabled={disabled}
  >
    <FontAwesome5 name="user" size={RFPercentage(3.2)} color={'black'} />
    <Text style={styles.text}>Sign in with Email</Text>
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

export default EmailSignInButton
