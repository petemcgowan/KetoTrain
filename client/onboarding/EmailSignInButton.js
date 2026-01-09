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

const EmailSignInButton = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome6
          name="envelope"
          size={RFPercentage(2.8)}
          color="white"
          iconStyle="solid"
        />
      </View>
      <Text style={styles.btnText}>Sign in with Email</Text>
    </TouchableOpacity>
  )
}

export default EmailSignInButton

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: width * 0.85, // Consistent width with Google/Apple buttons
    height: 50,
    backgroundColor: '#555555', // Dark Grey for Email
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  btnText: {
    color: 'white',
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
    flex: 1, // Centers text relative to remaining space
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
})
