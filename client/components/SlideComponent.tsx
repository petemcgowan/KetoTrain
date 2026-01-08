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
    paddingBottom: 20,
  },
  imageContainer: {
    width: width * 0.9,
    height: height * 0.4,
    alignSelf: 'center',
    marginTop: height * 0.05,
    marginBottom: height * 0.02,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  titleBox: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: RFPercentage(3.2),
  },
  textBox: {
    paddingHorizontal: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    color: 'rgb(240, 240, 240)', // Slightly off-white for readability
    textAlign: 'center',
    fontSize: RFPercentage(2.4),
    lineHeight: RFPercentage(3.2),
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
