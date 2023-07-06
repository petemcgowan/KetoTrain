import React from 'react'
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'

import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')

const SlideComponent = ({ title, description, image }) => {
  const dominantColor = 'rgb(38, 27, 21)' // Dominant colour of image

  return (
    <View style={styles.slideContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>{description}</Text>
      </View>
      {/* <View style={styles.textBox}>
      </View> */}
    </View>
  )
}

export default SlideComponent

const styles = StyleSheet.create({
  slideContainer: {
    width: width,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  imageContainer: {
    // flex: 0.5,
    width: width * 0.9,
    height: height * 0.4,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textBox: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 15,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: RFPercentage(2.3),
    maxWidth: width - 40,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    maxWidth: width - 40,
    fontSize: RFPercentage(3.1),
    // width: width,
    justifyContent: 'center',
    // alignItems: 'center',
  },
})
