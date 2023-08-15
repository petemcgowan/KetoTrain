import React, { useState, useContext } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Button,
} from 'react-native'
import { FoodDataType } from '../types/FoodDataType'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers'

const FavFoodModal: React.FC<{
  isVisible: boolean
  onClose: () => void
  onSave: (selectedFoods: FoodDataType[]) => void
}> = ({ isVisible, onClose, onSave }) => {
  const favFoodList = useSelector((state: RootState) => state.favFoodList)

  const [selectedFoods, setSelectedFoods] = useState<Set<number>>(new Set())
  console.log('favFoodList:' + favFoodList)
  const toggleFoodSelection = (foodId: number) => {
    const newSet = new Set(selectedFoods)
    if (newSet.has(foodId)) {
      newSet.delete(foodId)
    } else {
      newSet.add(foodId)
    }
    setSelectedFoods(newSet)
  }

  const handleSave = () => {
    onSave(
      Array.from(selectedFoods).map(
        (id) => favFoodList.find((food) => food.foodFactsId === id)!
      )
    )
    onClose()
  }

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={favFoodList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => toggleFoodSelection(item.foodFactsId)}
              style={{
                backgroundColor: selectedFoods.has(item.foodFactsId)
                  ? 'white'
                  : 'black',
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: selectedFoods.has(item.foodFactsId)
                    ? 'black'
                    : 'white',
                }}
              >
                {item.foodName}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.foodFactsId.toString()}
        />
        <Button title="OK" onPress={handleSave} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  )
}

export default FavFoodModal
