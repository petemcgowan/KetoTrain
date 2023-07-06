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
import LearnDeck from '../learn/LearnDeck'

const Tab = createBottomTabNavigator()
export const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const BottomTabNavigator = () => {
  const { totalCarbs, trackerItems } = useContext(TrackerContext)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator tabBar={(props) => <AnimatedTabBar {...props} />}>
        <Tab.Screen
          name="Food Search"
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
              color: 'rgb(124, 131, 134)',
              fontSize: 44,
              fontWeight: '200',
            },
            headerStyle: {
              backgroundColor: '#1A0546',
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
              color: 'rgb(124, 131, 134)',
              fontSize: 44,
              fontWeight: '200',
            },
            headerStyle: {
              backgroundColor: '#350244',
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
              backgroundColor: 'aqua',
            },
            headerTitleStyle: {
              color: 'rgb(124, 131, 134)',
              fontSize: 44,
              fontWeight: '200',
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
          name="Help"
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
              color: 'rgb(124, 131, 134)',
              fontSize: 44,
              fontWeight: '200',
            },
            headerStyle: {
              backgroundColor: '#5C6500',
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

export const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#350244',
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: 60,
    width: 60,
    marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#3490dc',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 55,
    width: 55,
  },
})
