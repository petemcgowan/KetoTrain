import React from 'react'
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import rain_falling_brain_alpha_waves_energy from '../../assets/images/rain_falling_brain_alpha_waves_energy.png'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')

const Onboarding1 = () => {
  const dominantColor = 'rgb(38, 27, 21)' // Dominant colour of image

  return (
    <View style={styles.slideContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={rain_falling_brain_alpha_waves_energy}
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          Alpha waves, ranging from 8 to 12 Hz, are produced by our brain in a
          relaxed, meditative state. A lack of these waves indicates we're not
          fully at ease.
        </Text>
      </View>
    </View>
  )
}

export default Onboarding1

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
    // flex: 0.6,
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
