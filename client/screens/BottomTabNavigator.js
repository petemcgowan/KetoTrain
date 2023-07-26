import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AnimatedTabBar } from '../tabbar/AnimatedTabBar'
import { StyleSheet } from 'react-native'
import Svg from 'react-native-svg'
import Animated from 'react-native-reanimated'
import TrackerContext from '../state/TrackerContext'

import Lottie from 'lottie-react-native'
import SearchScreen from './SearchScreen'
import KetoTrackerScreen from './KetoTrackerScreen'
import KetoLimitScreen from './KetoLimitScreen'
import LearnDeck from './LearnDeck'
import { ThemeContext } from '../state/ThemeContext'

const Tab = createBottomTabNavigator()
export const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const BottomTabNavigator = () => {
  const { totalCarbs, trackerItems } = useContext(TrackerContext)
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: theme.viewBackground },
        }}
        tabBar={(props) => <AnimatedTabBar {...props} />}
      >
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          initialParams={{
            itemId: 42,
            itemId2: 67,
          }}
          options={{
            tabBarIcon: ({ ref }) => (
              <Lottie
                ref={ref}
                loop={false}
                source={require('../assets/lottie/125888-avocado-fruit-exercise-animation.json')}
                style={styles.icon}
              />
            ),
            headerTitleStyle: {
              color: theme.tabHeaderText,
              fontSize: 38,
              fontWeight: '300',
            },
            headerStyle: {
              backgroundColor: theme.tabHeaderBackground,
            },
          }}
        />
        <Tab.Screen
          name="Keto Tracker"
          component={KetoTrackerScreen}
          options={{
            tabBarIcon: ({ ref }) => (
              <Lottie
                ref={ref}
                loop={false}
                source={require('../assets/lottie/88719-checklist.json')}
                style={styles.icon}
              />
            ),
            tabBarBadge: trackerItems.length,
            headerTitleStyle: {
              color: theme.tabHeaderText,
              fontSize: 38,
              fontWeight: '300',
            },
            headerStyle: {
              backgroundColor: theme.tabHeaderBackground,
            },
            tabBarItemStyle: {
              backgroundColor: 'rgba(59, 73, 55, 1)',
            },
            tabBarBadgeStyle: {
              backgroundColor: '#453749',
              color: '#BBBccc',
              fontSize: 17,
            },
          }}
        />
        <Tab.Screen
          name="Keto Limit"
          component={KetoLimitScreen}
          options={{
            tabBarIcon: ({ ref }) => (
              <Lottie
                ref={ref}
                loop={false}
                source={require('../assets/lottie/64165-statistics-chart.json')}
                style={styles.icon}
              />
            ),
            tabBarBadge: totalCarbs,
            headerStyle: {
              opacity: 0.9,
              backgroundColor: theme.tabHeaderBackground,
            },
            headerTitleStyle: {
              color: theme.tabHeaderText,
              fontSize: 38,
              fontWeight: '300',
            },
            tabBarItemStyle: {
              backgroundColor: 'rgba(59, 73, 55, 1)',
              color: '#BBBccc',
            },
            tabBarBadgeStyle: {
              backgroundColor: '#2196F3',
              color: '#BBBccc',
              fontSize: 17,
            },
          }}
        />
        <Tab.Screen
          name="Learn"
          component={LearnDeck}
          options={{
            tabBarIcon: ({ ref }) => (
              <Lottie
                ref={ref}
                loop={false}
                source={require('../assets/lottie/33101-light-bulb-animation.json')}
                style={styles.icon}
              />
            ),
            headerTitle: {
              paddingHorizontal: 20,
              paddingBottom: 20,
              padding: 10,
            },
            headerTitleStyle: {
              color: theme.tabHeaderText,
              fontSize: 38,
              fontWeight: '300',
            },
            headerStyle: {
              backgroundColor: theme.tabHeaderBackground,
            },
            tabBarItemStyle: {
              backgroundColor: 'rgba(59, 73, 55, 1)',
            },
          }}
        />
      </Tab.Navigator>
    </GestureHandlerRootView>
  )
}

export default BottomTabNavigator

const getStyles = (theme) =>
  StyleSheet.create({
    component: {
      height: 60,
      width: 60,
      marginTop: -5,
    },
    icon: {
      height: 55,
      width: 55,
    },
  })
