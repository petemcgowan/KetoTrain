export type FoodDataType = {
  foodFactsId: number
  foodName: string
  carbohydrates: number
  totalDietaryFibre: number
  protein: number
  fatTotal: number
  energy: number
  totalSugars: number
  sodium: number
  calcium: number
  classification: string
  iodine: number
  magnesium: number
  potassium: number
  publicFoodKey: string
  saturatedFat: number
  isFavourite: boolean
}
export type FoodListState = FoodDataType[]
