import React, { useState, useEffect, useContext, useRef } from 'react'
import {
  FlatList,
  Dimensions,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native'
import SlideComponent from '../components/SlideComponent'
import { ThemeContext } from '../state/ThemeContext'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')
const slides = [
  {
    component: SlideComponent,
    title: 'Keto Basics',
    description: `The ketogenic diet involves consuming high fats, moderate proteins, and low carbs. \n\nThis dietary shift prompts the liver to produce ketones, a type of fatty acid, which becomes the main energy source for the body.\n\n`,
    //In ketosis, the body efficiently burns fat for energy, reducing the reliance on glucose from carbohydrates.  Over time, this can lead to weight loss and improved metabolic health. \n\nThe diet also tends to suppress appetite, leading to fewer calorie intakes without much effort. \n\nIt's essential, however, to consult with a healthcare provider before starting to ensure it's the right fit.
    referenceLink: 'https://www.healthline.com/nutrition/ketogenic-diet-101',
    referenceSource: 'Source: Healthline',
    image: require('../assets/images/learn/KetoBasics_steak_bacon_scrambled_egg_avocados_spinach.png'),
  },
  {
    component: SlideComponent,
    title: 'Brain Boost',
    description: `Ketones, produced during ketosis, aren't just for muscles. They provide a stable and efficient energy source for the brain, enhancing cognitive functions, focus, and mental clarity. \n\nSome studies even suggest a therapeutic potential for ketones in neurodegenerative diseases like Alzheimer's and Parkinson's.  `,
    // A well-managed keto diet can thus benefit both the body and mind. \n\nKetones have anti-inflammatory properties, which can further support brain health. \n\nAdditionally, since the brain is made up of nearly 60% fat, the healthy fats from a keto diet can bolster its structural and functional integrity. \n\nThis is why some individuals on keto report improved mood and reduced anxiety.
    referenceLink: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5102124/',
    referenceSource: 'Source: NCBI',
    image: require('../assets/images/learn/BrainBoost_futuristic_metallic_brain.jpg'),
  },
  {
    component: SlideComponent,
    title: 'Fat Burning Zone',
    description: `By consuming under 50g of carbs daily, the body enters a metabolic state called ketosis, optimizing fat burning. \n\nIn this state, the body’s insulin levels drop, allowing fatty acids to be released from the fat stores in your body.\n\n`,
    //These fatty acids are converted in the liver into ketones, supplying energy for the brain. \n\nThis metabolic shift away from glucose can enhance endurance in prolonged physical activities. It also supports the preservation of muscle mass during weight loss. \n\nMoreover, fat is a more consistent energy source, which can lead to increased overall energy levels.
    referenceLink: 'https://www.medicalnewstoday.com/articles/319196',
    referenceSource: 'Source: Medical News Today',
    image: require('../assets/images/learn/FatBurningZone_runner_gaining_speed.jpg'),
  },
  {
    component: SlideComponent,
    title: 'Intermittent Fasting',
    description: `Intermittent fasting synergizes with the keto diet by extending the body's fasting period, thereby potentially enhancing ketone production. \n\nIt's not just about skipping meals but rather cycling between periods of eating and fasting.\n\n`,
    //It can help regulate blood sugar, improve mental clarity, and even boost longevity. \n\nIntermittent fasting also promotes autophagy, the body's process for cleaning out damaged cells and regenerating new ones. Combining it with keto can amplify fat burning and health benefits. \n\nHowever, just like keto, it's important to approach intermittent fasting mindfully and ensure it's suitable for your individual needs.
    referenceLink:
      'https://www.health.harvard.edu/blog/intermittent-fasting-surprising-update-2018062914156',
    referenceSource: 'Source: Harvard Health Blog',
    image: require('../assets/images/learn/IntermittentFasting_sandglass_sand.jpg'),
  },
  {
    component: SlideComponent,
    title: 'Avocado Power',
    description: `Avocados offer a unique combination of healthy fats, fiber, and essential nutrients such as potassium. \n\nThey're not just keto-friendly; they're also heart-healthy and can help stabilize blood sugar levels.  Its creamy texture and versatility make it a staple in many keto recipes. `,
    //\n\nAvocados also support skin health due to their vitamin E content. \n\nTheir natural oils can keep skin hydrated and reduce inflammation. \n\nAdditionally, the presence of lutein in avocados supports eye health, reducing the risk of age-related macular degeneration.
    referenceLink: 'https://www.medicalnewstoday.com/articles/270406',
    referenceSource: 'Source: Medical News Today</a>',
    image: require('../assets/images/learn/AvacadoPower_superheros_badge_shaped_like_an_avocado.jpg'),
  },
  {
    component: SlideComponent,
    title: 'Drink Up',
    description: `Hydration is crucial, especially on the keto diet where the body can quickly lose water. Drinking plenty aids in metabolism, skin health, and digestion. \n\nMoreover, the body sometimes confuses thirst with hunger, so staying hydrated can prevent overeating.\n\n`,
    //Opt for water or unsweetened beverages to avoid hidden carbs. \n\nElectrolytes, which are vital for muscle function and other body processes, can be lost more rapidly on keto, so hydrating with electrolyte-rich sources, like bone broth or electrolyte tablets, can be beneficial. \n\nFurthermore, proper hydration supports kidney function and helps the body rid itself of waste products more efficiently. \n\nRemember, it's not just the amount, but also the timing of water intake that matters – evenly spacing it throughout the day ensures optimal absorption.
    referenceLink:
      'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256',
    referenceSource: 'Source: Mayo Clinic',
    image: require('../assets/images/learn/DrinkUp_refreshing_glass_of_pure_spring_water.jpg'),
  },
  {
    component: SlideComponent,
    title: 'Fiber Focus',
    description: `Dietary fiber, while not digestible, plays a vital role in maintaining gut health, aiding digestion, and preventing constipation. \n\nFor those on keto, high-fiber veggies can also help prevent the "keto flu" by balancing electrolytes and aiding hydration.`,
    //\n\nWhile fiber is a carb, it doesn't impact blood sugar like other carbs, making it a must-have for keto. Consuming a diet rich in fiber can also help in weight management by promoting a feeling of fullness. \n\nFiber acts as a prebiotic, fueling beneficial gut bacteria, leading to improved gut health and overall well-being. \n\nIt's also essential for regulating cholesterol levels in the body, further supporting heart health.
    referenceLink:
      'https://www.hsph.harvard.edu/nutritionsource/carbohydrates/fiber/',
    referenceSource: 'Source: Harvard T.H. Chan',
    image: require('../assets/images/learn/FiberFocus_strong_vibrant_tree.jpg'),
  },
  {
    component: SlideComponent,
    title: 'Healthy Fats',
    description: `Not all fats are created equal. On keto, the focus is on monounsaturated and polyunsaturated fats – those found in olive oil, nuts, and seeds. \n\nThese fats can reduce bad cholesterol, lower the risk of heart disease, and provide essential nutrients.`,
    //\n\nAvoid trans fats and limit saturated fats for optimal health benefits. Consuming healthy fats can also support skin health, improving its elasticity and hydration. \n\nAdditionally, these fats can play a role in hormone production, influencing various physiological processes.  \n\nIt's vital, however, to pair fat consumption with a varied diet to ensure all necessary nutrients are obtained.
    referenceLink:
      'https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/fats/healthy-cooking-oils',
    referenceSource: 'Source: American Heart Association',
    image: require('../assets/images/learn/healthy_fats_like_nuts_chia_seeds_olive_oil_and_seeds.png'),
  },
  {
    component: SlideComponent,
    title: 'Keto Flu Alert',
    description: `Transitioning to the keto diet can lead to the "keto flu", characterized by symptoms like headaches, fatigue, and irritability. This is due to the body's adjustment to burning fat for fuel. \n\nIt's important to monitor electrolyte balance, stay hydrated, and give the body time to adapt.  `,
    //\n\nWhile challenging, this phase is temporary and can be managed with proper care. \n\nConsuming bone broth, rich in minerals, can alleviate some of these symptoms. \n\nGetting adequate sleep and allowing oneself time to adjust to this new metabolic state can ease the transition. \n\nMild exercise, like walking, can also help in overcoming the initial fatigue associated with the keto flu.
    referenceLink: 'https://www.dietdoctor.com/low-carb/keto/flu-side-effects',
    referenceSource: 'Source: Diet Doctor',
    image: require('../assets/images/learn/KetoFlu_pink_himalayan_salt_macro.png'),
  },
  {
    component: SlideComponent,
    title: 'Track and Thrive',
    description: `Consistency and monitoring are key to succeeding on the keto diet. By tracking daily carb intake and other macros, one can tailor the diet to personal needs, ensuring optimal nutrient balance and health benefits.\n\nUsing tracking tools, like this app, can simplify the process and lead to better, more informed dietary choices. `,
    //\n\nRegularly logging meals, symptoms, and body changes can provide insights into how the diet affects one's overall well-being. \n\nFurthermore, the act of tracking can boost accountability, helping to maintain discipline and focus on the ultimate health goals.
    referenceLink: 'https://www.eatwell101.com/low-carb-diet-tracking-tips',
    referenceSource: 'Source: Eatwell101',
    image: require('../assets/images/learn/TrackAndThrive_person_on_a_journey_following_a_pathway_shape.jpg'),
  },
]

const LearnDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0)

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
  const horizontalScrollRef = useRef(null)

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

  const disableHorizontalScrolling = () => {
    horizontalScrollRef.current &&
      horizontalScrollRef.current.setNativeProps({ scrollEnabled: false })
  }

  const enableHorizontalScrolling = () => {
    horizontalScrollRef.current &&
      horizontalScrollRef.current.setNativeProps({ scrollEnabled: true })
  }

  useEffect(() => {
    console.log('useEffect, LearnDeck')
  }, [])

  return (
    <SafeAreaView style={styles.container}>
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

      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const SlideComponent = item.component
          return (
            <SlideComponent
              title={item.title}
              description={item.description}
              image={item.image}
              referenceLink={item.referenceLink}
              referenceSource={item.referenceSource}
              onBeginScroll={disableHorizontalScrolling}
              onEndScroll={enableHorizontalScrolling}
            />
          )
        }}
        keyExtractor={(item, index) => index.toString()}
      />
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
      paddingTop: 45,
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
      top: 0,
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
