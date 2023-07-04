import React from 'react'
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import surreal_sand_timer from '../../assets/images/surreal_sand_timer.png'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')

const Onboarding3 = () => {
  const dominantColor = 'rgb(9, 21, 39)' // Dominant colour of image

  return (
    <View style={styles.slideContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={surreal_sand_timer}></Image>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>Three word title.</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          Here is the description. Here is the description. Here is the
          description. Here is the description. Here is the description. Here is
          the description. Here is the description.
        </Text>
      </View>
    </View>
  )
}

export default Onboarding3

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
  },
  imageContainer: {
    // flex: 0.5,
    width: width * 0.9,
    height: height * 0.4,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: RFPercentage(2.3),
  },
  textBox: {
    flex: 1,
    width: width,

    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
})
