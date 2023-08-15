import React from 'react'
import { FoodDataType } from './FoodDataType'

export type FavFoodContextType = {
  favFoodList: FoodDataType[]
  setFavFoodList: React.Dispatch<React.SetStateAction<FoodDataType[]>>
}
