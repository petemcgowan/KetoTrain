import React from 'react'
import { SearchListType } from './SearchListType'

export type SearchFoodContextType = {
  searchFoodList: SearchListType[]
  setSearchFoodList: React.Dispatch<React.SetStateAction<SearchListType[]>>
}
