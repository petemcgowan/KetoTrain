import React from 'react'
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native'

import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')

interface SlideComponentProps {
  title: string
  description: string
  image: ImageSourcePropType
  referenceLink?: string
  referenceSource?: string
}

const SlideComponent: React.FC<SlideComponentProps> = ({
  title,
  description,
  image,
  referenceLink,
  referenceSource,
}) => {
  return (
    <ScrollView
      style={styles.slideContainer}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>

      <View style={styles.titleBox}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>{description}</Text>
      </View>

      {referenceLink && (
        <View style={styles.referenceView}>
          <TouchableOpacity onPress={() => Linking.openURL(referenceLink)}>
            <Text style={styles.linkText}>{referenceSource}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}

export default SlideComponent

const styles = StyleSheet.create({
  slideContainer: {
    width: width,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: height * 0.02,
  },
  imageContainer: {
    width: width * 0.9,
    height: height * 0.4,
    alignSelf: 'center',
    marginTop: height * 0.05, // to prevent image from being pushed too far down
    marginBottom: height * 0.02,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  titleBox: {
    paddingHorizontal: width * 0.02,
    marginBottom: height * 0.02,
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: RFPercentage(3.0),
  },
  textBox: {
    paddingHorizontal: width * 0.02,
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  text: {
    color: 'rgb(240, 240, 240)', // Slightly off-white for readability
    textAlign: 'center',
    fontSize: RFPercentage(2.1),
    lineHeight: RFPercentage(2.5), // line-height for easier reading
  },
  referenceView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  linkText: {
    color: 'rgb(44, 207, 157)',
    textDecorationLine: 'underline',
    fontSize: RFPercentage(2.2),
  },
})
