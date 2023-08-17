import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoadingScreen from '../onboarding/LoadingScreen'
import OnboardingDeck from '../onboarding/OnboardingDeck'
import BottomTabNavigator from '../screens/BottomTabNavigator'
import { useSelector } from 'react-redux'
import { actionCreators } from '../redux/index'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../redux/index'

const Stack = createStackNavigator()

export default function CentralNavigation() {
  // const hasSeenIntro = useSelector((state: RootState) => state.hasSeenIntro)
  const hasSeenIntro = false
  const dispatch = useDispatch()
  const { updateHasSeenIntro } = bindActionCreators(actionCreators, dispatch)

  // React.useEffect(() => {
  // })

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnboardingDeck"
        screenOptions={{ headerShown: false }}
      >
        {!hasSeenIntro && (
          <Stack.Screen name="OnboardingDeck" component={OnboardingDeck} />
        )}
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
