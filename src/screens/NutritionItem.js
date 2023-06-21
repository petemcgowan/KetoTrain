import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { View, Text, StyleSheet } from 'react-native'

const NutritionItem = ({ icon, name, value }) => (
  <View style={styles.nutritionItem}>
    <FontAwesome5 name={icon} size={20} color={'rgb(2, 158, 147)'} />
    <Text style={styles.nutritionName}>{name}</Text>
    <Text style={styles.nutritionValue}>{value}</Text>
  </View>
)

export default NutritionItem

const styles = StyleSheet.create({
  nutritionItem: {
    width: '45%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'rgb(32, 32, 32)', // temp
  },
  nutritionName: {
    fontSize: 16,
    color: 'rgb(2, 158, 147)',
  },
  nutritionValue: {
    fontSize: 16,
    color: 'rgb(2, 158, 147)',
  },
})
