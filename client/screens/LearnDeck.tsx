import React, { useState, useEffect, useContext } from 'react'
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SlideComponent from '../components/SlideComponent'
import { ThemeContext } from '../state/ThemeContext'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')
const slides = [
  {
    component: SlideComponent,
    title: 'Keto Basics',
    description:
      'The ketogenic diet involves consuming high fats, moderate proteins, and low carbs to get your body into a state of ketosis, where it burns fat for fuel instead of carbs.',
    image: require('../assets/images/learn/healthy_fats_like_nuts_seeds_olive_oil_salmon_meat.png'),
  },
  {
    component: SlideComponent,
    title: 'Fat Burning Zone',
    description:
      'When you consume under 50g of carbs daily, your body enters ketosis and efficiently burns fat for energy. This is optimal for weight loss and a boost in energy levels.',
    image: require('../assets/images/learn/FatBurningZone_runner_gaining_speed.jpg'),
  },
  {
    component: SlideComponent,
    title: 'Intermittent Fasting',
    description:
      'Combine the keto diet with intermittent fasting, where you eat during a specific window of the day, to enhance fat loss and improve metabolic health.',
    image: require('../assets/images/learn/IntermittentFasting_sandglass_sand.jpg'),
  },
  {
    component: SlideComponent,
    title: 'Avocado Power',
    description:
      'Avocados are a keto superstar! Rich in healthy fats, fiber, and micronutrients, they keep you full and are perfect for maintaining a low carb intake.',
    image: require('../assets/images/learn/AvacadoPower_superheros_badge_shaped_like_an_avocado.jpg'),
  },
  {
    component: SlideComponent,
    title: 'Drink Up',
    description:
      'Staying hydrated is key. Water boosts metabolism, helps in fat burning, and keeps you full. Swap sugary drinks for water, tea, or coffee.',
    image: require('../assets/images/learn/DrinkUp_refreshing_glass_of_pure_spring_water.jpg'),
  },
  {
    component: SlideComponent,
    title: 'Fiber Focus',
    description:
      'Fiber is crucial in a keto diet. It helps in digestion and keeps you full longer. Include high-fiber, low-carb vegetables like spinach and broccoli in your diet.',
    image: require('../assets/images/learn/FiberFocus_strong_vibrant_tree.jpg'),
  },
  {
    component: SlideComponent,
    title: 'Brain Boost',
    description:
      'Ketosis can improve brain function by providing ketones, a more efficient fuel than glucose, especially helpful in reducing seizures in epilepsy. ',
    image: require('../assets/images/learn/BrainBoost_futuristic_metallic_brain.jpg'),
  },
  {
    component: SlideComponent,
    title: 'Healthy Fats',
    description:
      'Opt for healthy fats like nuts, seeds, and olive oil. These are not only keto-friendly but also beneficial for your heart and overall health.',
    image: require('../assets/images/learn/healthy_fats_like_nuts_chia_seeds_olive_oil_and_seeds.png'),
  },
  {
    component: SlideComponent,
    title: 'Keto Flu Alert',
    description:
      'When starting a keto diet, some people experience flu-like symptoms. Stay hydrated and balance electrolytes to alleviate these symptoms.',
    image: require('../assets/images/learn/stay_hydrated_and_balance_electrolytes.png'),
  },
  {
    component: SlideComponent,
    title: 'Track and Thrive',
    description:
      'Keep track of your carb intake to stay in ketosis. Use our app to easily log and monitor your daily carbs and make informed food choices.',
    image: require('../assets/images/learn/TrackAndThrive_person_on_a_journey_following_a_pathway_shape.jpg'),
  },
]

const LearnDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const navigation = useNavigation()
  const [backgroundColor, setBackgroundColor] = useState('#000')
  const slideColors = [
    'rgb(38, 27, 21)',
    'rgb(25, 26, 29)',
    'rgb(9, 21, 39)',
    'rgb(38, 27, 21)',
    'rgb(25, 26, 29)',
    'rgb(9, 21, 39)',
    'rgb(38, 27, 21)',
    'rgb(25, 26, 29)',
    'rgb(9, 21, 39)',
    'rgb(38, 27, 21)',
  ]
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

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
        setBackgroundColor(slideColors[slide]) // Set the background color when the slide changes
      }
    }
  }

  const onStartNowPress = () => {
    navigation.navigate('MainApp')
  }

  const onLinkPress = () => {
    console.log('LinkPress')
  }

  useEffect(() => {}, [])

  return (
    <SafeAreaView
      style={[styles.container /*, { backgroundColor: backgroundColor }*/]}
    >
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
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
          <Text
            key={index}
            style={index === activeSlide ? styles.activeDot : styles.dot}
          >
            •
          </Text>
        ))}
      </View>
    </SafeAreaView>
  )
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.viewBackground,
    },
    scrollView: {
      flex: 0.55,
      paddingTop: 20,
    },
    imageBox: {
      width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pagination: {
      flexDirection: 'row',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: height * 0.3 + 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      fontSize: RFPercentage(5.8),
      color: '#888',
      margin: 5,
    },
    activeDot: {
      fontSize: RFPercentage(5.8),
      color: '#FFF',
      margin: 5,
    },
  })

export default LearnDeck
