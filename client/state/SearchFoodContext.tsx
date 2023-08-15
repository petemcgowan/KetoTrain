import React from 'react'
import { SearchFoodContextType } from '../types/SearchFoodContextType'

const defaultValues = {
  searchFoodList: [],
  setSearchFoodList: (value) => {},
}

const SearchFoodContext =
  React.createContext<SearchFoodContextType>(defaultValues)
export const SearchFoodProvider = SearchFoodContext.Provider
export default SearchFoodContext
