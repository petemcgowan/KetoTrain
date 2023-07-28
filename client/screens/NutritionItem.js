import React, { useContext } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { View, Text, StyleSheet } from 'react-native'
import { ThemeContext } from '../state/ThemeContext'

const NutritionItem = ({ icon, name, value }) => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  return (
    <View style={styles.nutritionItem}>
      <FontAwesome5 name={icon} size={26} color={theme.iconFill} />
      <Text style={styles.nutritionName}>{name}</Text>
      <Text style={styles.nutritionValue}>{value}</Text>
    </View>
  )
}

export default NutritionItem

const getStyles = (theme) =>
  StyleSheet.create({
    nutritionItem: {
      width: '45%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      backgroundColor: theme.tableBackground,
    },
    nutritionName: {
      fontSize: 16,
      color: theme.buttonText,
    },
    nutritionValue: {
      fontSize: 16,
      color: theme.buttonText,
    },
  })
