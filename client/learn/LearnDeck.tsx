import React, { useState, useEffect } from 'react'
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

const { width, height } = Dimensions.get('window')
const slides = [
  {
    component: SlideComponent,
    title: 'Keto Basics',
    description:
      'The ketogenic diet involves consuming high fats, moderate proteins, and low carbs to get your body into a state of ketosis, where it burns fat for fuel instead of carbs.',
    image: require('../../assets/images/rain_falling_brain_alpha_waves_energy.png'),
  },
  {
    component: SlideComponent,
    title: 'Fat Burning Zone',
    description:
      'When you consume under 50g of carbs daily, your body enters ketosis and efficiently burns fat for energy. This is optimal for weight loss and a boost in energy levels.',
    image: require('../../assets/images/productivity_replenishing_sleep_cleansing_rain_calming.png'),
  },
  {
    component: SlideComponent,
    title: 'Intermittent Fasting',
    description:
      'Combine the keto diet with intermittent fasting, where you eat during a specific window of the day, to enhance fat loss and improve metabolic health.',
    image: require('../../assets/images/surreal_sand_timer.png'),
  },
  {
    component: SlideComponent,
    title: 'Avocado Power',
    description:
      'Avocados are a keto superstar! Rich in healthy fats, fiber, and micronutrients, they keep you full and are perfect for maintaining a low carb intake.',
    image: require('../../assets/images/surreal_sand_timer.png'),
  },
  {
    component: SlideComponent,
    title: 'Drink Up',
    description:
      'Staying hydrated is key. Water boosts metabolism, helps in fat burning, and keeps you full. Swap sugary drinks for water, tea, or coffee.',
    image: require('../../assets/images/surreal_sand_timer.png'),
  },
  {
    component: SlideComponent,
    title: 'Fiber Focus',
    description:
      'Fiber is crucial in a keto diet. It helps in digestion and keeps you full longer. Include high-fiber, low-carb vegetables like spinach and broccoli in your diet.',
    image: require('../../assets/images/surreal_sand_timer.png'),
  },
  {
    component: SlideComponent,
    title: 'Brain Boost',
    description:
      'Ketosis can improve brain function by providing ketones, a more efficient fuel than glucose, especially helpful in reducing seizures in epilepsy. ',
    image: require('../../assets/images/surreal_sand_timer.png'),
  },
  {
    component: SlideComponent,
    title: 'Healthy Fats',
    description:
      'Opt for healthy fats like nuts, seeds, and olive oil. These are not only keto-friendly but also beneficial for your heart and overall health.',
    image: require('../../assets/images/surreal_sand_timer.png'),
  },
  {
    component: SlideComponent,
    title: 'Keto Flu Alert',
    description:
      'When starting a keto diet, some people experience flu-like symptoms. Stay hydrated and balance electrolytes to alleviate these symptoms.',
    image: require('../../assets/images/surreal_sand_timer.png'),
  },
  {
    component: SlideComponent,
    title: 'Track and Thrive',
    description:
      'Keep track of your carb intake to stay in ketosis. Use our app to easily log and monitor your daily carbs and make informed food choices.',
    image: require('../../assets/images/surreal_sand_timer.png'),
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

  /*
  OK so the parent needs the colour, but its the slide that would theoretically "know" that.  Of course the parent
  */

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor }]}
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    // height: height * 0.7,
    flex: 0.55,
    paddingTop: 20,
    // flexDirection: 'row',
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
    fontSize: 50,
    color: '#888',
    margin: 5,
  },
  activeDot: {
    fontSize: 50,
    color: '#FFF',
    margin: 5,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgb(44, 207, 157)',
    padding: 10,
    borderRadius: 20,
    elevation: 5, // for Android
    shadowOffset: {
      // for iOS
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  link: {
    position: 'absolute',
    bottom: 20,
  },
  linkText: {
    color: 'rgb(44, 207, 157)',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flex: 0.15,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // paddingBottom: 20,
  },
})

export default LearnDeck
