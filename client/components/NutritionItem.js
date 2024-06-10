import React, { useContext } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { ThemeContext } from '../state/ThemeContext'

const { width } = Dimensions.get('screen')

const NutritionItem = ({ icon, name, value }) => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  return (
    <View style={styles.nutritionItemContainer}>
      <View style={styles.nutIconContainer}>
        <FontAwesome5 name={icon} size={26} color={theme.iconFill} />
      </View>
      <View style={styles.nutNameContainer}>
        <Text style={styles.nutritionName}>{name}</Text>
      </View>
      <View style={styles.nutValueContainer}>
        <Text style={styles.nutritionValue}>{value}</Text>
      </View>
    </View>
  )
}

export default NutritionItem

const getStyles = (theme) =>
  StyleSheet.create({
    nutIconContainer: {
      marginLeft: 40,
      marginBottom: 10,
    },
    nutNameContainer: {
      marginBottom: 10,
    },
    nutValueContainer: {
      marginRight: 40,
      marginBottom: 10,
    },
    nutritionItemContainer: {
      flex: 1,
      width: width,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.tableBackground,
    },
    nutritionName: {
      fontSize: 20,
      color: theme.buttonText,
    },
    nutritionValue: {
      fontSize: 20,
      color: theme.buttonText,
    },
  })
