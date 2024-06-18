import React from 'react'

import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

const EmailLoginComponent = ({
  email,
  setEmail,
  password,
  setPassword,
  handleEmailLogin,
  signupCreateUser,
  handleForgotPasswordPress,
  isLoginFormVisible,
}) => {
  return (
    <View style={styles.emailLoginContainer}>
      {isLoginFormVisible && (
        <View style={styles.plainButtonContainer}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="gray"
            placeholder="Email"
            style={styles.emailText}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry
            style={styles.passwordText}
          />
          <TouchableOpacity
            onPress={() => handleEmailLogin(email, password)}
            style={styles.loginButton}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signupCreateUser(email, password)}
            style={styles.signupButton}
          >
            <Text style={styles.text}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleForgotPasswordPress(email)}
            style={styles.forgotButton}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
export default EmailLoginComponent

const styles = StyleSheet.create({
  emailLoginContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: 'darkslategray',
  },
  plainButtonContainer: {
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  emailText: {
    fontSize: RFPercentage(2.5),
    borderRadius: 8,
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  passwordText: {
    fontSize: RFPercentage(2.5),
    borderRadius: 8,
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    padding: 10,
    marginBottom: 15,
  },

  forgotButton: {
    width: '90%',
    backgroundColor: 'darkblue',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  signupButton: {
    width: '90%',
    backgroundColor: 'darkgreen',
    borderRadius: 30,
    marginBottom: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#4285F4',
    borderRadius: 30,
    height: 50,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#ffffff',
    fontSize: RFPercentage(2.7),
  },
  forgotText: {
    color: 'rgba(220, 255, 255, 1)',
    fontSize: RFPercentage(2.4),
  },
  text: {
    color: '#ffffff',
    fontSize: RFPercentage(2.5),
  },
})
