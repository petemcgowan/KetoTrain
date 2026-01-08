import React, { useState, useRef, useEffect } from 'react'
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import SlideComponent from '../components/SlideComponent'
import BottomSheet from '@gorhom/bottom-sheet'
import LoginBottomSheet from './LoginBottomSheet'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import * as Sentry from '@sentry/react-native'
import Config from 'react-native-config'

// firebase vanilla auth
import auth from '@react-native-firebase/auth'
import { actionCreators } from '../redux/index'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

const { width, height } = Dimensions.get('window')

const slides = [
  {
    component: SlideComponent,
    title: 'Stay Informed & Motivated',
    description:
      'This app empowers you with knowledge about ketosis and the ketogenic diet. \n\nTrack your progress, set goals, and gain insights that keep you motivated on your journey towards improved health.',
    image: require('../assets/images/stay_informed_and_motivated.png'),
    color: 'rgb(38, 27, 21)',
  },
  {
    component: SlideComponent,
    title: 'Extensive Food Database',
    description:
      'With access to an extensive list of over 2000 foods, finding and tracking the carbohydrate content of what you eat is effortless. \n\nMake informed choices and easily manage your daily intake.',
    image: require('../assets/images/extensive_food_database_4.png'),
    color: 'rgb(9, 21, 39)',
  },
  {
    component: SlideComponent,
    title: 'Health Benefits Abound',
    description:
      'Staying in ketosis is linked to numerous health benefits. \n\nIt may improve heart health, combat brain disorders, and help managing diabetes. Control your carb intake to reap these rewards!',
    image: require('../assets/images/health_benefits_abound.png'),
    color: 'rgb(25, 26, 29)',
  },
  {
    component: SlideComponent,
    title: 'Tailored to Your Journey',
    description: `Whether you're just starting out or have been following a ketogenic lifestyle for a while, this app provides the tools you need to effectively track your carbohydrate intake and stay in ketosis.`,
    image: require('../assets/images/tailored_to_your_journey.png'),
    color: 'rgb(25, 26, 29)',
  },
  {
    component: SlideComponent,
    title: 'Achieve Ketosis Naturally',
    description:
      'Track your carbohydrate intake and stay within your limits to achieve ketosis. \n\nIn ketosis, your body switches to burning fat as its primary fuel source, promoting natural weight loss and a boost in energy levels.',
    image: require('../assets/images/achieve_ketosis_naturally_3.png'),
    color: 'rgb(38, 27, 21)',
  },
]

const OnboardingDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false)

  const sheetRef = useRef<BottomSheet>(null)
  const [isSigninInProgress, setSigninInProgress] = useState(false)
  const navigation = useNavigation<any>()
  const [backgroundColor, setBackgroundColor] = useState('rgb(38, 27, 21)')
  const dispatch = useDispatch()
  const { updateEmailAddress } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    GoogleSignin.configure({
      // iosClientId is vital for iOS. Android reads from google-services.json
      iosClientId: Config.IOS_CLIENT_ID,
    })
  }, [])

  // Handle Firebase User State Changes
  const onUserChanged = (user: any) => {
    if (user) {
      console.log('User is logged in: ', user.email)
    } else {
      console.log('User is logged out')
    }
  }

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const subscriber = auth().onAuthStateChanged(onUserChanged)
      return subscriber // unsubscribe on unmount
    }
  }, [])

  const onScroll = (event: any) => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    )
    if (slide !== activeSlide && slide < slides.length) {
      setActiveSlide(slide)
      if (slides[slide]) {
        setBackgroundColor(slides[slide].color)
      }
    }
  }

  // --- AUTH LOGIC ---

  const handleGoogleLogin = async () => {
    try {
      setSigninInProgress(true)
      await GoogleSignin.hasPlayServices()

      const response = await GoogleSignin.signIn()

      if (response.data) {
        const userInfo = response.data
        console.log('Google User:', userInfo)

        updateEmailAddress(userInfo.user.email)

        // Navigation Logic
        navigation.navigate('LoadingScreen')
        sheetRef.current?.close()
        setIsSheetOpen(false)
      }
      setSigninInProgress(false)
    } catch (error) {
      Sentry.captureException('Error in handleGoogleLogin:', error)
      console.error('Error in handleGoogleLogin:', error)
      setSigninInProgress(false)
    }
  }

  const validateLoginDetails = async (email: string, password: string) => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter an email address.')
      return false
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.')
      return false
    }
    if (password.trim() === '') {
      Alert.alert('Error', 'Please enter a password.')
      return false
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password should be at least 8 characters long.')
      return false
    }
    return true
  }

  const signupCreateUser = async (email: string, password: string) => {
    const isValid = await validateLoginDetails(email, password)
    if (!isValid) return

    try {
      setSigninInProgress(true)
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      )
      const user = userCredential.user

      if (user.email) updateEmailAddress(user.email)

      console.log('User account created & signed in!')
      Sentry.captureMessage('User account created & signed in')

      navigation.navigate('LoadingScreen')
      sheetRef.current?.close()
      setIsSheetOpen(false)
      setSigninInProgress(false)
    } catch (error: any) {
      Sentry.captureException('Error signing up:', error)
      Alert.alert('Error', error.message || 'Could not create account.')
      setSigninInProgress(false)
    }
  }

  const handleEmailLogin = async (email: string, password: string) => {
    const isValid = await validateLoginDetails(email, password)
    if (!isValid) return

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      )
      const user = userCredential.user
      if (user.email) updateEmailAddress(user.email)

      console.log('User signed in!')
      Sentry.captureMessage('Vanilla User has logged in successfully')

      navigation.navigate('LoadingScreen')
      sheetRef.current?.close()
      setIsSheetOpen(false)
      setSigninInProgress(false)
    } catch (error: any) {
      setSigninInProgress(false)
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Info', "That's the wrong password!")
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Info', 'Badly formatted email address.')
      } else {
        Sentry.captureException('Error signing in:', error)
        Alert.alert('Login Error', error.message)
      }
    }
  }

  const handleForgotPassword = async (email: string) => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter an email address.')
      return false
    }
    try {
      await auth().sendPasswordResetEmail(email)
      Alert.alert('Info', 'Password reset email sent!')
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No account exists with this email address.')
      } else {
        Alert.alert('Error', 'Failed to reset password. Please try again.')
      }
    }
  }

  const handleForgotPasswordPress = async (email: string) => {
    await handleForgotPassword(email)
  }

  async function onAppleButtonPress() {
    try {
      setSigninInProgress(true)
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      })

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      )

      if (credentialState === appleAuth.State.AUTHORIZED) {
        if (appleAuthRequestResponse.email) {
          updateEmailAddress(appleAuthRequestResponse.email)
        } else {
          // If email is hidden, use the user ID or previous stored logic
          updateEmailAddress(appleAuthRequestResponse.user)
        }
        Sentry.captureMessage('Apple User has logged in successfully')

        navigation.navigate('LoadingScreen')
        sheetRef.current?.close()
        setIsSheetOpen(false)
      }
      setSigninInProgress(false)
    } catch (error: any) {
      // Error 1000 is user cancel or simulator failure
      if (error.code !== '1000' && error.code !== '1001') {
        Sentry.captureException('Error in handleAppleLogin:', error)
      }
      console.error('Error in handleAppleLogin:', error)
      setSigninInProgress(false)
    }
  }

  // --- UI LOGIC ---

  const onStartNowPress = () => {
    if (isLoginFormVisible) {
      setIsLoginFormVisible(false) // Go back to buttons
    } else {
      // Toggle Sheet
      if (isSheetOpen) {
        sheetRef.current?.close()
        setIsSheetOpen(false)
      } else {
        sheetRef.current?.expand()
        setIsSheetOpen(true)
      }
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <ScrollView
            style={styles.scrollView}
            horizontal
            pagingEnabled
            onScroll={onScroll}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          >
            {slides.map((slide, index) => {
              const SlideComponent = slide.component
              return (
                <SlideComponent
                  key={index}
                  title={slide.title}
                  description={slide.description}
                  image={slide.image}
                />
              )
            })}
          </ScrollView>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <View style={styles.dotContainer} key={index}>
                <Text
                  key={index}
                  style={index === activeSlide ? styles.activeDot : styles.dot}
                >
                  •
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button} onPress={onStartNowPress}>
            <Text style={styles.buttonText}>Start Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* THE WIRED UP SHEET */}
      <LoginBottomSheet
        sheetRef={sheetRef}
        onStartNowPress={onStartNowPress}
        handleGoogleLogin={handleGoogleLogin}
        onAppleButtonPress={onAppleButtonPress}
        isSigninInProgress={isSigninInProgress}
        handleEmailLogin={handleEmailLogin}
        signupCreateUser={signupCreateUser}
        handleForgotPasswordPress={handleForgotPasswordPress}
        setIsLoginFormVisible={setIsLoginFormVisible}
        isLoginFormVisible={isLoginFormVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer: { flex: 1 },
  scrollView: { flex: 0.55, paddingTop: 20 },
  bottomContainer: {
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: width * 0.65,
    height: 55,
    backgroundColor: 'rgb(44, 207, 157)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFF',
    fontSize: RFPercentage(2.7),
    fontWeight: '500',
  },
  dotContainer: { alignItems: 'center', justifyContent: 'center' },
  dot: { fontSize: RFPercentage(6), color: '#888', marginHorizontal: 8 },
  activeDot: { fontSize: RFPercentage(6), color: '#FFF', marginHorizontal: 8 },
})

export default OnboardingDeck
