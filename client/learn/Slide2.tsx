import React from 'react'
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import productivity_replenishing_sleep_cleansing_rain_calming from '../assets/images/productivity_replenishing_sleep_cleansing_rain_calming.png'

const { width, height } = Dimensions.get('window')

const Slide2 = ({ title }) => {
  const dominantColor = 'rgb(25, 26, 29)' // Dominant colour of image

  return (
    <View style={styles.slideContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={productivity_replenishing_sleep_cleansing_rain_calming}
        ></Image>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          Boosting alpha waves through activities like meditation can enhance
          your creativity, reduce stress, and promote calmness. An imbalance of
          these waves is often linked to depression.
        </Text>
      </View>
    </View>
  )
}

export default Slide2

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
    fontSize: RFPercentage(2.3), // 2.5% of screen height
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
