import React, { useContext, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AnimatedTabBar } from '../tabbar/AnimatedTabBar'
import { StyleSheet, TouchableOpacity, View, Platform } from 'react-native'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import Svg from 'react-native-svg'
import Animated from 'react-native-reanimated'
import TrackerContext from '../state/TrackerContext'
import { RFPercentage } from 'react-native-responsive-fontsize'

import { actionCreators } from '../redux/index'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import Lottie from 'lottie-react-native'
import SearchScreen from './SearchScreen'
import KetoTrackerScreen from './KetoTrackerScreen'
import ChartsScreen from './ChartsScreen'
import AIBioHackerScreen from './AIBioHackerScreen'
import { ThemeContext } from '../state/ThemeContext'
import { updateSearchFoodList } from '../redux/action-creators'

const Tab = createBottomTabNavigator()
export const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const BottomTabNavigator = () => {
  const { setTheme, setNextTheme } = useContext(ThemeContext)
  const dispatch = useDispatch()

  const { updateHasSeenIntro } = bindActionCreators(actionCreators, dispatch)

  const { totalCarbs, trackerItems, setTrackerItems } =
    useContext(TrackerContext)
  const searchFoodList = useSelector((state) => state.searchFoodList)

  const context = useContext(ThemeContext)
  if (!context) throw new Error('No Theme Context')
  const { theme } = context
  const styles = getStyles(theme)

  // Common Header Styles (Fixes clipping and alignment)
  const commonScreenOptions = ({ navigation }) => ({
    headerTitleAlign: 'center',
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: theme.tabHeaderBackground,
      height: Platform.OS === 'ios' ? 120 : 100, // Taller header
    },
    headerTitleStyle: {
      color: theme.tabHeaderText,
      fontSize: RFPercentage(4.5),
      fontWeight: '300',
      paddingBottom: 10,
    },
    headerRightContainerStyle: { paddingRight: 15, paddingBottom: 10 },
    headerLeftContainerStyle: { paddingLeft: 15, paddingBottom: 10 },

    headerRight: () => (
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
        <FontAwesome6
          name="palette"
          size={RFPercentage(3.5)}
          color={theme.tabHeaderText}
          iconStyle="solid"
        />
      </TouchableOpacity>
    ),
  })

  useEffect(() => {
    // Has seen intro, now turn off onboarding
    updateHasSeenIntro(true)
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={(props) => <AnimatedTabBar {...props} />}
        screenOptions={commonScreenOptions}
      >
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
            tabBarBadgeStyle: styles.badge,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <FontAwesome6
                  name="gear" // FA6 Name
                  size={RFPercentage(3.5)}
                  color={theme.tabHeaderText}
                  iconStyle="solid"
                />
              </TouchableOpacity>
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
            tabBarBadge: Math.round(totalCarbs),
            tabBarBadgeStyle: styles.badge,
          }}
        />
        <Tab.Screen
          name="Keto AI"
          component={AIBioHackerScreen}
          options={{
            tabBarIcon: ({ ref }) => (
              <Lottie
                ref={ref}
                loop={false}
                source={require('../assets/lottie/33101-light-bulb-animation.json')}
                style={styles.icon}
              />
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
    icon: { height: 55, width: 55 },
    badge: {
      backgroundColor: '#453749',
      color: '#BBBccc',
      fontSize: RFPercentage(1.5),
    },
  })
