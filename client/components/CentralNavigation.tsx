import * as React from 'react'
import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent } from './DrawerContent'
import { createStackNavigator } from '@react-navigation/stack'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import { navigationRef } from './RootNavigation'

import BottomTabNavigator from '../screens/BottomTabNavigator'
import LoadingScreen from '../onboarding/LoadingScreen'
import OnboardingDeck from '../onboarding/OnboardingDeck'
import { useSelector } from 'react-redux'
import { actionCreators } from '../redux/index'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../redux/index'
import { DeleteAccountScreen } from './DeleteAccountScreen'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export default function CentralNavigation() {
  const hasSeenIntro = useSelector((state: RootState) => state.hasSeenIntro)
  // const hasSeenIntro = false
  const dispatch = useDispatch()
  const { updateHasSeenIntro } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    const unsubscribe = appleAuth.onCredentialRevoked(async () => {
      console.warn('User’s Apple credentials have been revoked')
      // Handle the revocation - possibly sign the user out or show a notification.
    })

    // remove the listener when the component is unmounted.
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="OnboardingDeck"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="OnboardingDeck" component={OnboardingDeck} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        {hasSeenIntro && (
          <Stack.Screen name="MainApp" options={{ headerShown: false }}>
            {() => (
              <Drawer.Navigator
                drawerContent={(props) => <DrawerContent {...props} />}
              >
                <Drawer.Screen name="Home" component={BottomTabNavigator} />
                <Drawer.Screen
                  name="DeleteAccount"
                  component={DeleteAccountScreen}
                />
              </Drawer.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
