import React, { useState, useContext } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native'
import { FoodDataType } from '../types/FoodDataType'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers'
import { ThemeContext, themes } from '../state/ThemeContext'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { height } = Dimensions.get('window')

const FavFoodModal: React.FC<{
  isVisible: boolean
  onClose: () => void
  onSave: (selectedFoods: FoodDataType[]) => void
}> = ({ isVisible, onClose, onSave }) => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  const favFoodList = useSelector((state: RootState) => state.favFoodList)

  const [selectedFoods, setSelectedFoods] = useState<Set<number>>(new Set())
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
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Add Food To Track</Text>
          </View>
          <FlatList
            data={favFoodList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => toggleFoodSelection(item.foodFactsId)}
                style={{
                  backgroundColor: selectedFoods.has(item.foodFactsId)
                    ? theme.tabBackground
                    : theme.navigationBackground,
                  padding: 10,
                }}
              >
                <Text
                  style={[
                    {
                      color: selectedFoods.has(item.foodFactsId)
                        ? 'white'
                        : 'white',
                    },
                    styles.tableText,
                  ]}
                >
                  {item.foodName}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.foodFactsId.toString()}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.buttonTouchable}>
              <View style={styles.innerButtonView}>
                <Text style={styles.buttonText}>Cancel</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSave()
                console.log('after handleSave')
                setSelectedFoods(new Set())
              }}
              style={styles.buttonTouchable}
            >
              <View style={styles.innerButtonView}>
                <Text style={styles.buttonText}>OK</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default FavFoodModal

const getStyles = (theme) => {
  return StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    modalView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      height: '60%',
      backgroundColor: theme.viewBackground,
    },
    modalHeaderText: {
      color: theme.buttonText,
      fontSize: RFPercentage(3.0),
    },
    tableText: {
      color: theme.buttonText,
      fontSize: RFPercentage(2.7),
    },
    modalHeader: {
      width: '100%',
      backgroundColor: theme.viewBackground,
      padding: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: RFPercentage(2.7),
      textAlign: 'center',
    },
    buttonTouchable: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      height: '100%',
      backgroundColor: theme.buttonBackground,
    },
    innerButtonView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      height: height * 0.1,
      flexDirection: 'row',
      width: '100%',
    },
  })
}
