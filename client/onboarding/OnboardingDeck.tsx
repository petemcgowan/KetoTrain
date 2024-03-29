import React, { useState, useEffect, useRef, useContext } from 'react'
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
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
import { appleAuth } from '@invertase/react-native-apple-authentication'

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
        console.log('slides[slide].color:' + slides[slide].color)
      }
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setSigninInProgress(true)
      const hasPlayServices = await GoogleSignin.hasPlayServices()
      console.log('hasPlayServices:' + hasPlayServices)
      const userInfo = await GoogleSignin.signIn().catch((error) => {
        console.log('Error during Google Sign In:', error)
      })
      console.log('userInfo:' + JSON.stringify(userInfo))
      updateEmailAddress(userInfo.user.email)
      navigation.navigate('LoadingScreen')
      sheetRef.current?.snapTo(1)
      console.log('sheet closed snapping to 1')
      setIsSheetOpen(false)
      setSigninInProgress(false)
    } catch (error) {
      console.log('Error in handleGoogleLogin:' + error)
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
    if (!email) {
      Alert.alert('Error', 'Please enter an email address.')
      return
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.')
      return
    }
    if (!password) {
      Alert.alert('Error', 'Please enter a password.')
      return
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password should be at least 8 characters long.')
      return
    }
  }

  // this is a "new function" to handle email Login, that I pulled from the button press one.  This actually logs in and then navigates.  No validation.  createUserWithEmailAndPassword
  const signupCreateUser = async (email, password) => {
    validateLoginDetails(email, password)

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
      Alert.alert('Info', 'User account created & signed in!')
      navigation.navigate('LoadingScreen')
      // remove the bottom sheet?  (while navigating)
      sheetRef.current?.snapTo(1)
      setIsSheetOpen(false)
      setSigninInProgress(false)
    } catch (error) {
      console.error('Error signing up: ', error)
    }
  }

  // validate user input.  Also calls Firebase to authenticate.  Then navigates. signInWithEmailAndPassword
  const handleEmailLogin = async (email, password) => {
    validateLoginDetails(email, password)
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      )
      const user = userCredential.user
      updateEmailAddress(user.email)
      console.log('User signed in!' + JSON.stringify(user))

      navigation.navigate('LoadingScreen')
      sheetRef.current?.snapTo(1)
      setIsSheetOpen(false)
      setSigninInProgress(false)
    } catch (error) {
      console.error('Error signing in: ', error)
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
    if (!email) {
      Alert.alert('Error', 'Please enter an email address.')
      return
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.')
      return
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
      } else {
        Alert.alert('Error', 'Failed to reset password. Please try again.')
        console.log('Failed to reset password, email:' + email)
        console.error('Error resetting password: ', error)
      }
    }
  }

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const subscriber = auth().onAuthStateChanged(onUserChanged)
      return subscriber // unsubscribe on unmount
    }
  }, [])

  async function onAppleButtonPress() {
    try {
      setSigninInProgress(true)
      console.log('handleAppleLogin')

      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      })
      console.log(
        'appleAuthRequestResponse:' + JSON.stringify(appleAuthRequestResponse)
      )

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      )
      console.log('credentialState:' + JSON.stringify(credentialState))

      if (credentialState === appleAuth.State.AUTHORIZED) {
        // User is authenticated with Apple. Handle accordingly.
        // You can now set their email or other details and navigate them to your app's main screen.
        console.log(
          'credentialState authorized, appleAuthRequestResponse.email:' +
            appleAuthRequestResponse.email
        )
        if (appleAuthRequestResponse.email) {
          updateEmailAddress(appleAuthRequestResponse.email)
        } else {
          updateEmailAddress(appleAuthRequestResponse.user) // for anonymized users, this is our uniqueness
        }
        navigation.navigate('LoadingScreen')
      } else {
        console.error(
          "I'm not expecting this control flow, the user has not been authorized by Apple, appleAuthRequestResponse.email:",
          appleAuthRequestResponse.email
        )
      }
      sheetRef.current?.snapTo(1)
      console.log('sheet closed snapping to 1')
      setIsSheetOpen(false)

      setSigninInProgress(false)
    } catch (error) {
      console.log('Error in handleAppleLogin:', error)
    }
  }

  const onStartNowPress = () => {
    console.log('onStartNowPress,isLoginFormVisible:' + isLoginFormVisible)

    if (isLoginFormVisible) {
      setIsLoginFormVisible(false) // hide email login form
      sheetRef.current?.snapTo(0) // close bottom sheet
      console.log('email form visible, snapping to 0')
      setIsSheetOpen(false)
    } else {
      if (isSheetOpen) {
        sheetRef.current?.snapTo(0) // close
        console.log('sheet open snapping to 0')
        setIsSheetOpen(false)
      } else {
        sheetRef.current?.snapTo(1) // open
        console.log('sheet closed snapping to 1')
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
      androidClientId:
        '534592509466-r0b52u6k67qqluglvd7eo6sptlsf1eqr.apps.googleusercontent.com',
      iosClientId:
        '534592509466-emk8vddvuarhkrqhdv1qlp5rg5ddtagi.apps.googleusercontent.com',
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

        {/* <TouchableOpacity style={styles.link} onPress={onLinkPress}>
          <Text style={styles.linkText}>Already have an account?</Text>
        </TouchableOpacity> */}
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
          handleForgotPassword={handleForgotPassword}
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
    // textAlign: 'center',
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
