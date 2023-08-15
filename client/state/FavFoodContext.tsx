import React from 'react'
import { FavFoodContextType } from '../types/FavFoodContextType'

const defaultValues = {
  favFoodList: [],
  setFavFoodList: (value) => {},
}

const FavFoodContext = React.createContext<FavFoodContextType>(defaultValues)
export const FavFoodProvider = FavFoodContext.Provider
export default FavFoodContext
