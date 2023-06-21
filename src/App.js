import React, { useState, useMemo, useEffect } from 'react'
import { Dimensions, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import SearchScreen from './screens/SearchScreen'
import KetoTrackerScreen from './screens/KetoTrackerScreen'
import KetoLimitScreen from './screens/KetoLimitScreen'
import HelpScreen from './screens/HelpScreen'
import TestView from './screens/TestView'

import { GlycemicProvider } from './state/GlycemicContext'
import { TrackerProvider } from './state/TrackerContext'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import SplashScreen from 'react-native-splash-screen'

const { width, height } = Dimensions.get('screen')
const APP_WIDTH = width
const APP_HEIGHT = height

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
    notification: 'blue',
  },
}
const Tab = createBottomTabNavigator()

export default function AppGlycemic() {
  const [trackerItems, setTrackerItems] = useState([])
  const [totalCarbs, setTotalCarbs] = useState(0)
  const [totalGILoad, setTotalGILoad] = useState(0)

  const value = useMemo(
    () => ({
      trackerItems,
      setTrackerItems,
      totalCarbs,
      setTotalCarbs,
      totalGILoad,
      setTotalGILoad,
    }),
    [trackerItems, totalCarbs, totalGILoad]
  )

  useEffect(() => {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    console.log('App, useEffect before splash hide')
    SplashScreen.hide()
    console.log('App, useEffect after splash hide')
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TrackerProvider value={value}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => {
              return {
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName
                  // Define icon based on the route name
                  switch (route.name) {
                    case 'Food Search':
                      iconName = 'search'
                      break
                    case 'Keto Tracker':
                      iconName = 'utensils'
                      break
                    case 'Keto Limit':
                      iconName = 'ban'
                      break
                    case 'Help':
                      iconName = 'book'
                      break
                    default:
                      iconName = 'search'
                  }

                  return (
                    <FontAwesome5
                      name={iconName}
                      size={focused ? 40 : 36}
                      // color={focused ? '#6E7B69' : '#3F5147'}   // monochromatic UI scheme
                      // color={focused ? '#350244' : '#735C84'} // Complementary UI scheme
                      color={focused ? '#2196F3' : '#527AB3'} // Analogous UI scheme
                    />
                  )
                },
                cardStyle: {
                  backgroundColor: 'black',
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'yellow', // color of text and icon when tab is active
                tabBarInactiveTintColor: 'orange', // color of text and icon when tab is inactive
              }
            }}
          >
            <Tab.Screen
              name="Food Search"
              component={SearchScreen}
              initialParams={{
                itemId: 42,
                itemId2: 67,
              }}
              options={{
                // tabBarIcon: ({ color, size }) => (
                //   <FontAwesome5 name="search" size={36} color="orange" />
                // ),
                headerTitleStyle: {
                  color: 'rgb(124, 131, 134)',
                  fontSize: 44,
                  fontWeight: '200',
                },
                headerStyle: {
                  backgroundColor: '#1A0546',
                },
                tabBarItemStyle: {
                  backgroundColor: 'rgba(59, 73, 55, 1)', // "#1b1344",
                },
              }}
            />
            <Tab.Screen
              name="Keto Tracker"
              component={KetoTrackerScreen}
              options={{
                // tabBarIcon: ({ color, size }) => (
                //   <FontAwesome5 name="utensils" size={36} color="orange" />
                // ),
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
                // tabBarIcon: ({ color, size }) => (
                //   <FontAwesome5 name="ban" size={36} color="orange" />
                // ),
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
              component={HelpScreen}
              options={{
                // tabBarIcon: ({ color, size }) => (
                //   <FontAwesome5 name="book" size={36} color="orange" />
                // ),
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
        </NavigationContainer>
      </TrackerProvider>
    </GestureHandlerRootView>
  )
}
