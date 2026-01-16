import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'

// Navigation Utilities
import { navigationRef } from './RootNavigation'

// Components & Screens
import { CustomDrawer } from './CustomDrawer'
import DeleteAccountScreen from './DeleteAccountScreen'
import BottomTabNavigator from '../screens/BottomTabNavigator'
import LoadingScreen from '../onboarding/LoadingScreen'
import OnboardingDeck from '../onboarding/OnboardingDeck'

// State
import { RootState } from '../redux/store'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

// Drawer Structure
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: { backgroundColor: 'transparent' }, // let CustomDrawer handle background
      }}
    >
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="DeleteAccount" component={DeleteAccountScreen} />
    </Drawer.Navigator>
  )
}

export default function CentralNavigation() {
  const hasSeenIntro = useSelector((state: RootState) => state.hasSeenIntro)

  const initialRoute = hasSeenIntro ? 'LoadingScreen' : 'OnboardingDeck'

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="OnboardingDeck" component={OnboardingDeck} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
