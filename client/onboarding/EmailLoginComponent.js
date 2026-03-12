import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { height } = Dimensions.get('window')

// Dynamic spacing based on screen height
const v = (percent) => Math.round((height * percent) / 100)

const EmailLoginComponent = ({
  mode, // 'login' | 'signup'
  email,
  setEmail,
  password,
  setPassword,
  onSignIn,
  onSignUp,
  onForgotPassword,
  onSwitchMode,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const isLogin = mode === 'login'

  return (
    <View style={styles.container}>
      <View style={[styles.fieldGroup, { marginBottom: v(2) }]}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="gray"
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={[styles.input, { marginTop: v(0.5), marginBottom: v(2) }]}
        />
      </View>

      <View style={[styles.fieldGroup, { marginBottom: v(2) }]}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="gray"
          placeholder="Enter password"
          secureTextEntry={!showPassword}
          style={[styles.input, { marginTop: v(0.5), marginBottom: v(1) }]}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.checkboxRow}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, showPassword && styles.checkboxChecked]}>
            {showPassword && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>Show password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => (isLogin ? onSignIn(email, password) : onSignUp(email, password))}
        style={[styles.primaryButton, { marginTop: v(2.5), marginBottom: v(2) }]}
      >
        <Text style={styles.primaryButtonText}>
          {isLogin ? 'Sign in' : 'Create account'}
        </Text>
      </TouchableOpacity>

      {isLogin ? (
        <>
          <TouchableOpacity
            onPress={() => onForgotPassword(email)}
            style={[styles.linkRow, { marginBottom: v(1.5) }]}
            activeOpacity={0.7}
          >
            <Text style={styles.link}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSwitchMode}
            style={styles.linkRow}
            activeOpacity={0.7}
          >
            <Text style={styles.linkLabel}>Don't have an account? </Text>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          onPress={onSwitchMode}
          style={styles.linkRow}
          activeOpacity={0.7}
        >
          <Text style={styles.linkLabel}>Already have an account? </Text>
          <Text style={styles.link}>Sign in</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default EmailLoginComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: v(3),
    paddingTop: v(1),
    minHeight: height * 0.35,
    justifyContent: 'center',
  },
  fieldGroup: {
    width: '100%',
  },
  label: {
    fontSize: RFPercentage(2.2),
    color: 'white',
    fontWeight: '500',
  },
  input: {
    fontSize: RFPercentage(2.5),
    borderRadius: 12,
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    paddingVertical: v(1.2),
    paddingHorizontal: 14,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: v(0.8),
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: RFPercentage(2.2),
    color: 'rgba(255,255,255,0.9)',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#4285F4',
    borderRadius: 12,
    paddingVertical: v(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: RFPercentage(2.6),
    fontWeight: '700',
  },
  linkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkLabel: {
    fontSize: RFPercentage(2.4),
    color: 'rgba(255,255,255,0.8)',
  },
  link: {
    fontSize: RFPercentage(2.5),
    color: '#64B5F6',
    fontWeight: '600',
  },
})
