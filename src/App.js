import React, { useState, useMemo, useEffect } from 'react'
import { Dimensions, View } from 'react-native'

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
    <>
      {
        <View style={{ width: APP_WIDTH, height: APP_HEIGHT }}>
          <TrackerProvider value={value}>
            <TestView />
            <NavigationContainer>
              <Tab.Navigator
                // theme={MyTheme}
                screenOptions={{
                  cardStyle: {
                    backgroundColor: 'black',
                  },
                  tabBarShowLabel: false,
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
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesome5 name="search" size={36} color="orange" />
                    ),
                    headerTitleStyle: {
                      color: 'rgb(124, 131, 134)',
                      fontSize: 44,
                      fontWeight: '200',
                    },
                    headerStyle: {
                      backgroundColor: '#1A0546', // "rgb(69,55,73)", // "rgba(138, 149, 143, 1)"
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
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesome5 name="utensils" size={36} color="orange" />
                    ),
                    tabBarBadge: trackerItems.length,
                    headerTitleStyle: {
                      color: 'rgb(124, 131, 134)', // "#fff",
                      fontSize: 44,
                      fontWeight: '200',
                    },
                    headerStyle: {
                      backgroundColor: '#350244', //  "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)"
                    },
                    tabBarItemStyle: {
                      backgroundColor: 'rgba(59, 73, 55, 1)', //"#1b1344",
                    },
                    tabBarBadgeStyle: {
                      backgroundColor: '#453749', // rgb(69,55,73)  (comp to dark green)
                      color: '#BBBccc',
                      fontSize: 17,
                    },
                  }}
                />
                <Tab.Screen
                  name="Keto Limit"
                  component={KetoLimitScreen}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesome5 name="ban" size={36} color="orange" />
                    ),
                    tabBarBadge: totalCarbs,
                    headerStyle: {
                      opacity: 0.9,
                      backgroundColor: 'aqua', // "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)"
                    },
                    headerTitleStyle: {
                      color: 'rgb(124, 131, 134)', // "#fff",
                      fontSize: 44,
                      fontWeight: '200',
                    },
                    tabBarItemStyle: {
                      backgroundColor: 'rgba(59, 73, 55, 1)', //"#1b1344",
                      color: '#BBBccc',
                    },
                    tabBarBadgeStyle: {
                      backgroundColor: '#2196F3', // rgb(69,55,73)  (comp to dark green)

                      color: '#BBBccc',
                      fontSize: 17,
                    },
                  }}
                />
                <Tab.Screen
                  name="Help"
                  component={HelpScreen}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesome5 name="book" size={36} color="orange" />
                    ),
                    headerTitle: {
                      paddingHorizontal: 20,
                      paddingBottom: 20,
                      padding: 10,
                    },
                    headerTitleStyle: {
                      color: 'rgb(124, 131, 134)', // "#fff",
                      fontSize: 44,
                      fontWeight: '200',
                    },
                    headerStyle: {
                      backgroundColor: '#5C6500', // "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)"
                    },
                    tabBarItemStyle: {
                      backgroundColor: 'rgba(59, 73, 55, 1)', // "#1b1344",
                    },
                  }}
                />
                {/* <Tab.Screen
                  name="Test"
                  component={TestView}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesome5 name="book" size={36} color="orange" />
                    ),
                    headerTitle: {
                      paddingHorizontal: 20,
                      paddingBottom: 20,
                      padding: 10,
                    },
                    headerTitleStyle: {
                      color: 'rgb(124, 131, 134)', // "#fff",
                      fontSize: 44,
                      fontWeight: '200',
                    },
                    headerStyle: {
                      backgroundColor: '#5C6500', // "rgb(69,55,73)", // // "rgba(138, 149, 143, 1)"
                    },
                    tabBarItemStyle: {
                      backgroundColor: 'rgba(59, 73, 55, 1)', // "#1b1344",
                    },
                  }}
                /> */}
              </Tab.Navigator>
            </NavigationContainer>
          </TrackerProvider>
        </View>
      }
    </>
  )
}
