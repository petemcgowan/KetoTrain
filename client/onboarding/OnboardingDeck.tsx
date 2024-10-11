import React, { useState, useEffect, useRef, useContext } from 'react'
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Button,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import SlideComponent from '../components/SlideComponent'
import BottomSheet from 'reanimated-bottom-sheet'
import LoginBottomSheet from './LoginBottomSheet'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import UserContext, { UserContextProps } from '../state/UserContext'
import {
  appleAuth,
  AppleRequestResponse,
} from '@invertase/react-native-apple-authentication'
import * as Sentry from '@sentry/react-native'
import Config from 'react-native-config'

// firebase vanilla auth
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
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
  const navigation = useNavigation()
  const [backgroundColor, setBackgroundColor] = useState('#000')
  // const { setEmailAddress } = useContext(UserContext) as UserContextProps
  const dispatch = useDispatch()
  const { updateEmailAddress } = bindActionCreators(actionCreators, dispatch)

  const onScroll = (event: any) => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    )
    if (slide !== activeSlide) {
      setActiveSlide(slide)

      if (slide > slides.length - 1) {
        console.log('Slides end reached')
      } else {
        setBackgroundColor(slides[slide].color)
      }
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setSigninInProgress(true)
      try {
        const hasPlayServices = await GoogleSignin.hasPlayServices()
        console.log('hasPlayServices:' + hasPlayServices)
        if (!hasPlayServices) {
          Alert.alert(
            'Info',
            'In order to use Google Sign In, please install Google Play Services'
          )
          return
        }
      } catch (error) {
        // Sentry.captureMessage(error)
        Alert.alert(
          'Info',
          'In order to use Google Sign In, please install Google Play Services'
        )
        console.error(
          'There is a problem checking Google Play Services installation:',
          error
        )
        return
      }

      const userInfo = await GoogleSignin.signIn().catch((signInError) => {
        const enhancedSignInError = new Error(
          `Error during Google Sign In: ${signInError.message}`
        )
        enhancedSignInError.stack = signInError.stack // Preserve the stack trace
        Sentry.withScope((scope) => {
          scope.setContext('Google Login sign in Request', {
            message: 'Error during Google Sign In',
            additionalData: '',
          })
          Sentry.captureException(enhancedSignInError)
        })
        Alert.alert(
          'Error',
          'Error during Google Sign In, check your details or Android setup'
        )
        console.error('Error during Google Sign In:', enhancedSignInError)
        return // Exit function since error is handled
      })
      console.log(
        'Google User has logged in successfully:' + JSON.stringify(userInfo)
      )
      Sentry.captureMessage(
        'Google User has logged in successfully' + JSON.stringify(userInfo)
      )
      updateEmailAddress(userInfo.user.email)
      navigation.navigate('LoadingScreen')
      sheetRef.current?.snapTo(1)

      setIsSheetOpen(false)
    } catch (error) {
      Sentry.captureException(error)
      console.error('Error in handleGoogleLogin:' + error)
    } finally {
      setSigninInProgress(false)
    }
  }

  // vanilla firebase auth
  const onUserChanged = (user) => {
    // Handle user state changes
    if (user) {
      console.log('User is logged in: ', user.email)
    } else {
      console.log('User is logged out')
    }
  }

  const validateLoginDetails = async (email, password) => {
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

  // this is a "new function" to handle email Login, that I pulled from the button press one.  This actually logs in and then navigates.  No validation.
  const signupCreateUser = async (email, password) => {
    const isValid = await validateLoginDetails(email, password)
    console.log('signupCreateUser, isValid:' + JSON.stringify(isValid))
    if (!isValid) {
      console.log('signupCreateUser, Returning due to invalid login details')
      return
    }

    try {
      setSigninInProgress(true)
      // new function, in the dialog to be called handEmailLogin
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      )
      const user = userCredential.user
      updateEmailAddress(user.email)
      console.log('User account created & signed in!' + JSON.stringify(user))
      Sentry.captureMessage(
        'User account created & signed in' + JSON.stringify(user)
      )
      Alert.alert('Info', 'User account created & signed in!')
      navigation.navigate('LoadingScreen')
      // remove the bottom sheet (while navigating)
      sheetRef.current?.snapTo(1)
      setIsSheetOpen(false)
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Info',
          'This email address is already in use. Either choose login or use a new email address to sign up please!'
        )
        console.log('This email address is already in use, email:' + email)
      } else {
        console.error('Error signing up, signupCreateUser: ', error)
        Sentry.captureException(
          'Error signing up, signupCreateUser/createUserWithEmailAndPassword: ',
          error
        )
      }
    } finally {
      setSigninInProgress(false)
    }
  }

  // validate user input.  Then authenticate.  Then navigate.
  const handleEmailLogin = async (email, password) => {
    const isValid = await validateLoginDetails(email, password)
    if (!isValid) {
      return
    }
    let userCredential: FirebaseAuthTypes.UserCredential | undefined

    try {
      try {
        userCredential = await auth().signInWithEmailAndPassword(
          email,
          password
        )
      } catch (error) {
        console.log(`TEMP1:error code:${error.code}`)
        if (error.code === 'auth/wrong-password') {
          Alert.alert(
            'Info',
            "That's the wrong password! Please enter a valid password."
          )
          console.log('Wrong password entered for email:' + email)
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert(
            'Info',
            'This email address is badly formatted. Please enter a valid email address!'
          )
          console.log('This email address is badly formatted, email:' + email)
        } else if (error.code === 'auth/user-not-found') {
          Alert.alert(
            'Info',
            'The user entered was not found in the system - try again!'
          )
          console.log(
            'The user entered was not found in the system - try again!:' + email
          )
        } else {
          Sentry.captureException(
            'Error signing in, handleEmailLogin/signInWithEmailAndPassword:',
            error
          )
          console.error('Error signing in, handleEmailLogin: ', error)
        }
        return
      }
      if (!userCredential) {
        Sentry.captureException(
          'No user credential object, handleEmailLogin/signInWithEmailAndPassword'
        )
        console.error('Error signing in, handleEmailLogin')
        return
      }

      const user = userCredential.user
      updateEmailAddress(user.email)
      console.log('User signed in!' + JSON.stringify(user))
      Sentry.captureMessage(
        'Vanilla User has logged in successfully' + JSON.stringify(user)
      )

      navigation.navigate('LoadingScreen')
      sheetRef.current?.snapTo(1)
      setIsSheetOpen(false)
    } catch (error) {
      console.log(`TEMP2:error code:${error.code}`)
      // if (error.code === 'auth/wrong-password') {
      //   Alert.alert(
      //     'Info',
      //     "That's the wrong password! Please enter a valid password."
      //   )
      //   console.log('Wrong password entered for email:' + email)
      // } else if (error.code === 'auth/invalid-email') {
      //   Alert.alert(
      //     'Info',
      //     'This email address is badly formatted. Please enter a valid email address!'
      //   )
      //   console.log('This email address is badly formatted, email:' + email)
      // } else if (error.code === 'auth/user-not-found') {
      //   Alert.alert(
      //     'Info',
      //     'The user entered was not found in the system - try again!'
      //   )
      //   console.log(
      //     'The user entered was not found in the system - try again!:' + email
      //   )
      // } else {
      Sentry.captureException(
        'Error signing in, handleEmailLogin/signInWithEmailAndPassword:',
        error
      )
      console.error('Error signing in, handleEmailLogin: ', error)
      // }
    } finally {
      setSigninInProgress(false)
    }
  }

  const signOut = async () => {
    try {
      await auth().signOut()
      console.log('User signed out!')
    } catch (error) {
      console.error('Error signing out: ', error)
    }
  }

  // password reset
  const handleForgotPassword = async (email) => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter an email address.')
      return false
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.')
      return false
    }

    try {
      await auth().sendPasswordResetEmail(email)
      console.log('Password reset email sent!')
      Alert.alert('Info', 'Password reset email sent!')
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert(
          'Error',
          'No account exists with this email address. Please enter a valid email address.'
        )
        console.log('No account exists with this email address, email:' + email)
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert(
          'Error',
          'This email address is badly formatted. Please enter a valid email address!'
        )
        console.log('This email address is badly formatted, email:' + email)
      } else {
        Sentry.captureException(
          'Failed to reset password, email:' + email,
          error
        )
        Alert.alert('Error', 'Failed to reset password. Please try again.')
        console.log('Failed to reset password, email:' + email)
        console.error('Error resetting password: ', error)
      }
    }
    return true
  }

  const handleForgotPasswordPress = async (email) => {
    await handleForgotPassword(email)
  }

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const subscriber = auth().onAuthStateChanged(onUserChanged)
      return subscriber // unsubscribe on unmount
    }
  }, [])

  async function onAppleButtonPress() {
    let appleAuthRequestResponse: AppleRequestResponse | null = null
    try {
      setSigninInProgress(true)

      // Apple Auth Request
      try {
        appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        })
      } catch (requestError) {
        if (requestError.code === '1000') {
          // Handle the specific case where the user is redirected to Settings
          console.log(
            'User redirected to Settings to sign in. Please try again.'
          )
          Sentry.captureMessage('User redirected to Settings to sign in.')
          return // User will need to sign in again
        } else {
          const enhancedRequestError = new Error(
            `Apple Auth Request Error: ${requestError.message}`
          )
          enhancedRequestError.stack = requestError.stack // Preserve the stack trace
          Sentry.withScope((scope) => {
            scope.setContext('Apple Auth Request', {
              message: 'Error during Apple Auth Request',
              additionalData: '',
            })
            Sentry.captureException(enhancedRequestError)
          })
          console.error('Apple Auth Request Error:', enhancedRequestError)
          return // Exit function since error is handled
        }
      }

      // Get Credential State
      try {
        if (appleAuthRequestResponse) {
          const credentialState = await appleAuth.getCredentialStateForUser(
            appleAuthRequestResponse.user
          )
          if (credentialState === appleAuth.State.AUTHORIZED) {
            // User is authenticated with Apple.
            // Setting their email etc. and navigating to app's main screen.
            console.log(
              'credentialState authorized, appleAuthRequestResponse.email:' +
                appleAuthRequestResponse.email +
                ', user:' +
                appleAuthRequestResponse.user
            )
            console.log(
              'credentialState authorized, appleAuthRequestResponse:' +
                JSON.stringify(appleAuthRequestResponse)
            )
            if (appleAuthRequestResponse.email) {
              updateEmailAddress(appleAuthRequestResponse.email)
            } else {
              updateEmailAddress(appleAuthRequestResponse.user) // for anonymized users, this is our uniqueness
            }
            Sentry.captureMessage(
              'Apple User has logged in successfully' +
                appleAuthRequestResponse.email
            )
            navigation.navigate('LoadingScreen')
          }
        } else {
          const unauthorizedMessage = 'User not authorized by Apple'
          Sentry.captureMessage(unauthorizedMessage)
          console.log(unauthorizedMessage, appleAuthRequestResponse)
          Alert.alert('Authorization Error', 'You are not authorized by Apple.')
        }
      } catch (credentialError) {
        const enhancedCredentialError = new Error(
          `Apple Credential State Error: ${credentialError.message}`
        )
        enhancedCredentialError.stack = credentialError.stack // Preserve the stack trace
        Sentry.withScope((scope) => {
          scope.setContext('Apple Auth', {
            message: 'Error getting credential state',
            user: appleAuthRequestResponse.user,
          })
          Sentry.captureException(enhancedCredentialError)
        })
        console.error('Apple Credential State Error:', enhancedCredentialError)
        return // Exit function since error is handled
      }

      // Close the sheet
      sheetRef.current?.snapTo(1)
      setIsSheetOpen(false)
    } catch (error) {
      console.log('error.code:' + error.code)
      console.log('error:' + JSON.stringify(error))
      if (error.code === '1000') {
        // Handle the specific case where the user is redirected to Settings
        console.log('User redirected to Settings to sign in. Please try again.')
        Sentry.captureMessage('User redirected to Settings to sign in.')
      } else {
        Sentry.captureException(error)
        console.error('Error in handleAppleLogin:', error)
      }
    } finally {
      // always reset logging in state
      setSigninInProgress(false)
    }
  }

  const onStartNowPress = () => {
    if (isLoginFormVisible) {
      setIsLoginFormVisible(false) // hide email login form
      sheetRef.current?.snapTo(0) // close bottom sheet
      setIsSheetOpen(false)
    } else {
      if (isSheetOpen) {
        sheetRef.current?.snapTo(0) // close
        setIsSheetOpen(false)
      } else {
        sheetRef.current?.snapTo(1) // open
        setIsSheetOpen(true)
      }
    }
  }

  const onLinkPress = () => {
    if (isSheetOpen) {
      sheetRef.current?.snapTo(0)
    } else {
      sheetRef.current?.snapTo(1)
    }
    setIsSheetOpen(!isSheetOpen)
  }

  useEffect(() => {
    GoogleSignin.configure({
      androidClientId: Config.ANDROID_CLIENT_ID,
      /*'534592509466-r0b52u6k67qqluglvd7eo6sptlsf1eqr.apps.googleusercontent.com'*/ iosClientId:
        Config.IOS_CLIENT_ID,
      /*'534592509466-emk8vddvuarhkrqhdv1qlp5rg5ddtagi.apps.googleusercontent.com'*/
    })
  }, [])

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
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
      <View
        style={
          isSheetOpen ? styles.bottomSheetVisible : styles.bottomSheetHidden
        }
      >
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'space-around',
  },
  topContainer: {
    flex: 1,
  },
  bottomSheetVisible: {
    position: 'absolute',
    bottom: 0,
    height: '50%',
    width: '100%',
  },
  bottomSheetHidden: {
    position: 'absolute',
    bottom: 0,
    height: 0,
    width: 0,
  },
  scrollView: {
    flex: 0.55,
    paddingTop: 20,
  },
  bottomContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flex: 0.06,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    width: width * 0.65,
    height: 50,
    backgroundColor: 'rgb(44, 207, 157)',
    padding: 10,
    marginBottom: 20,
    borderRadius: 30,
    elevation: 5, // for Android
    shadowOffset: {
      // for iOS
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    fontSize: RFPercentage(6.2),
    lineHeight: RFPercentage(6.2), // special handling for special character
    color: '#888',
    marginHorizontal: 11,
  },
  activeDot: {
    fontSize: RFPercentage(6.8),
    lineHeight: RFPercentage(6.8), // special handling for special character
    textAlignVertical: 'center',
    color: '#FFF',
    marginHorizontal: 11,
  },
  buttonText: {
    color: '#FFF',
    fontSize: RFPercentage(2.7),
  },
  link: {
    marginBottom: 10,
  },
  linkText: {
    color: 'rgb(44, 207, 157)',
    fontSize: RFPercentage(2.6),
    textDecorationLine: 'underline',
  },
})

export default OnboardingDeck
