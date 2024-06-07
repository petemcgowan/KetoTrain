import React, { useContext, useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AnimatedTabBar } from '../tabbar/AnimatedTabBar'
import { StyleSheet, TouchableOpacity, View, Text, Modal } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Svg from 'react-native-svg'
import Animated from 'react-native-reanimated'
import TrackerContext from '../state/TrackerContext'
import { RFPercentage } from 'react-native-responsive-fontsize'

import { actionCreators } from '../redux/index'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import Lottie from 'lottie-react-native'
import SearchScreen from './SearchScreen'
import KetoTrackerScreen from './KetoTrackerScreen'
import ChartsScreen from './ChartsScreen'
import LearnDeck from './LearnDeck'
import { ThemeContext, themes } from '../state/ThemeContext'
import { RootState } from '../redux/reducers/index'
import { useSelector } from 'react-redux'
import { updateSearchFoodList } from '../redux/action-creators'

const Tab = createBottomTabNavigator()
export const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const BottomTabNavigator = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const { setTheme, setNextTheme } = useContext(ThemeContext)
  const dispatch = useDispatch()
  const { updateHasSeenIntro } = bindActionCreators(actionCreators, dispatch)

  const { totalCarbs, trackerItems, setTrackerItems } =
    useContext(TrackerContext)

  const searchFoodList = useSelector((state: RootState) => state.searchFoodList)
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  useEffect(() => {
    // Has seen intro, now turn off onboarding
    updateHasSeenIntro(true)
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator tabBar={(props) => <AnimatedTabBar {...props} />}>
        <Tab.Screen
          name="Track"
          component={KetoTrackerScreen}
          options={({ navigation }) => ({
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
              fontSize: RFPercentage(4.8),
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
              fontSize: RFPercentage(1.8),
            },
            headerLeft: () => (
              <View style={styles.settingsButton}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <FontAwesome5
                    name="cog"
                    size={RFPercentage(3.7)}
                    color={theme.tabHeaderText}
                  />
                </TouchableOpacity>
              </View>
            ),
            headerRight: () => (
              <View style={styles.colourSchemeButton}>
                <TouchableOpacity
                  onPress={() =>
                    setNextTheme(
                      trackerItems,
                      setTrackerItems,
                      searchFoodList,
                      updateSearchFoodList,
                      dispatch
                    )
                  }
                >
                  <FontAwesome5
                    name="palette"
                    size={RFPercentage(3.7)}
                    color={theme.tabHeaderText}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
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
              fontSize: RFPercentage(4.8),
              fontWeight: '300',
            },
            headerStyle: {
              backgroundColor: theme.tabHeaderBackground,
            },
            headerRight: () => (
              <View style={styles.colourSchemeButton}>
                <TouchableOpacity
                  onPress={() =>
                    setNextTheme(
                      trackerItems,
                      setTrackerItems,
                      searchFoodList,
                      updateSearchFoodList,
                      dispatch
                    )
                  }
                >
                  <FontAwesome5
                    name="palette"
                    size={RFPercentage(3.7)}
                    color={theme.tabHeaderText}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Progress"
          component={ChartsScreen}
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
              fontSize: RFPercentage(4.8),
              fontWeight: '300',
            },
            tabBarItemStyle: {
              backgroundColor: 'rgba(59, 73, 55, 1)',
              color: '#BBBccc',
            },
            tabBarBadgeStyle: {
              backgroundColor: '#2196F3',
              color: '#BBBccc',
              fontSize: RFPercentage(1.8),
            },
            headerRight: () => (
              <View style={styles.colourSchemeButton}>
                <TouchableOpacity
                  onPress={() =>
                    setNextTheme(
                      trackerItems,
                      setTrackerItems,
                      searchFoodList,
                      updateSearchFoodList,
                      dispatch
                    )
                  }
                >
                  <FontAwesome5
                    name="palette"
                    size={RFPercentage(3.7)}
                    color={theme.tabHeaderText}
                  />
                </TouchableOpacity>
              </View>
            ),
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
              fontSize: RFPercentage(4.8),
              fontWeight: '300',
            },
            headerStyle: {
              backgroundColor: theme.tabHeaderBackground,
            },
            tabBarItemStyle: {
              backgroundColor: 'rgba(59, 73, 55, 1)',
            },
            headerRight: () => (
              <View style={styles.colourSchemeButton}>
                <TouchableOpacity
                  onPress={() =>
                    setNextTheme(
                      trackerItems,
                      setTrackerItems,
                      searchFoodList,
                      updateSearchFoodList,
                      dispatch
                    )
                  }
                >
                  <FontAwesome5
                    name="palette"
                    size={RFPercentage(3.7)}
                    color={theme.tabHeaderText}
                  />
                </TouchableOpacity>
              </View>
            ),
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
    colourSchemeButton: {
      marginRight: 10,
      marginBottom: 5,
    },
    settingsButton: {
      marginLeft: 10,
      marginBottom: 5,
    },
  })
