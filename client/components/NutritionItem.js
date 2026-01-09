import React, { useContext } from 'react'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { ThemeContext } from '../state/ThemeContext'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')

const NutritionItem = ({ icon, name, value }) => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('No Theme Context')
  const { theme } = context
  const styles = getStyles(theme)

  return (
    <View style={styles.cardContainer}>
      {/* Icon Circle */}
      <View style={styles.iconCircle}>
        <FontAwesome6
          name={icon}
          size={RFPercentage(2.5)}
          color={theme.buttonText}
          iconStyle="solid"
        />
      </View>

      {/* Text Info */}
      <View style={styles.textContainer}>
        <Text
          style={styles.valueText}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
        >
          {value}
        </Text>
        <Text
          style={styles.labelText}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
        >
          {name}
        </Text>
      </View>
    </View>
  )
}

export default NutritionItem

const getStyles = (theme) =>
  StyleSheet.create({
    cardContainer: {
      // Dynamic Width: 2 Columns
      width: width / 2 - width * 0.07,
      height: height * 0.11, // Fixed height for consistency

      // Glass Effect
      // backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderRadius: width * 0.05,
      padding: width * 0.03,
      marginBottom: height * 0.015,

      // Layout
      flexDirection: 'row',
      alignItems: 'center',

      // Border
      borderWidth: 1,
      // borderColor: 'rgba(255,255,255,0.05)',

      // Shadow
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.15,
      // shadowRadius: 4,
      // elevation: 3,
    },
    iconCircle: {
      width: width * 0.1,
      height: width * 0.1,
      borderRadius: (width * 0.1) / 2,
      // backgroundColor: 'rgba(255, 255, 255, 0.08)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    valueText: {
      fontSize: RFPercentage(2.5),
      fontWeight: 'bold',
      color: theme.buttonText,
      marginBottom: 2,
    },
    labelText: {
      fontSize: RFPercentage(1.4),
      color: theme.buttonText,
      opacity: 0.6,
      textTransform: 'uppercase',
      fontWeight: '600',
    },
  })
