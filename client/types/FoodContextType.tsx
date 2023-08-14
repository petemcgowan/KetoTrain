import React from 'react'
import { FoodDataType } from './FoodDataType'

export type FoodContextType = {
  foodData: FoodDataType[]
  setFoodData: React.Dispatch<React.SetStateAction<FoodDataType[]>>
}
