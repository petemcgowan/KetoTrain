import React from 'react'
import { FoodContextType } from '../types/FoodContextType'

const defaultValues = {
  foodData: [],
  setFoodData: (value) => {},
}

const FoodContext = React.createContext<FoodContextType>(defaultValues)
export const FoodProvider = FoodContext.Provider
export default FoodContext
