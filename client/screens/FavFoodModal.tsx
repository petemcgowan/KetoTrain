import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native'
import { ThemeContext } from '../state/ThemeContext'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import GlycemicItem from '../components/GlycemicItem'

const { width, height } = Dimensions.get('window')

interface Props {
  isVisible: boolean
  onClose: () => void
  onSave: (selectedFoods: any[]) => void
}

export default function FavFoodModal({ isVisible, onClose, onSave }: Props) {
  const { theme } = useContext(ThemeContext)!
  const styles = getStyles(theme)

  const favFoodList = useSelector((state: RootState) => state.favFoodList) || []
  const [selectedItems, setSelectedItems] = useState<any[]>([])

  // Reset selection when modal opens
  useEffect(() => {
    if (isVisible) setSelectedItems([])
  }, [isVisible])

  const toggleSelection = (item: any) => {
    if (selectedItems.find((i) => i.publicFoodKey === item.publicFoodKey)) {
      setSelectedItems((prev) =>
        prev.filter((i) => i.publicFoodKey !== item.publicFoodKey)
      )
    } else {
      setSelectedItems((prev) => [...prev, item])
    }
  }

  const renderItem = ({ item }: { item: any }) => {
    const isSelected = selectedItems.some(
      (i) => i.publicFoodKey === item.publicFoodKey
    )
    return (
      <TouchableOpacity
        onPress={() => toggleSelection(item)}
        style={[styles.row, isSelected && styles.selectedRow]}
      >
        <View style={{ flex: 1, pointerEvents: 'none' }}>
          <GlycemicItem
            descriptionGI={item.foodName}
            carbAmt={item.carbohydrates}
            carbBackgroundColor={item.carbBackgroundColor}
            isFavourite={true}
            onPressDetail={() => {}} // No detail sheet inside modal
          />
        </View>
        {isSelected && (
          <View style={styles.checkIcon}>
            <FontAwesome6
              name="check"
              size={20}
              color="white"
              iconStyle="solid"
            />
          </View>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Add from Favorites</Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome6
                name="xmark"
                size={24}
                color={theme.buttonText}
                iconStyle="solid"
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={favFoodList}
            renderItem={renderItem}
            keyExtractor={(item) => item.publicFoodKey || item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <TouchableOpacity
            style={[
              styles.saveButton,
              selectedItems.length === 0 && styles.disabledButton,
            ]}
            onPress={() => {
              onSave(selectedItems)
              onClose()
            }}
            disabled={selectedItems.length === 0}
          >
            <Text style={styles.saveText}>
              ADD SELECTED ({selectedItems.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const getStyles = (theme: any) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.7)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      height: '80%',
      backgroundColor: theme.viewBackground,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      color: theme.buttonText,
      fontSize: RFPercentage(3),
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      borderRadius: 10,
      overflow: 'hidden',
    },
    selectedRow: { borderColor: theme.buttonBackground, borderWidth: 2 },
    checkIcon: {
      position: 'absolute',
      right: 10,
      backgroundColor: theme.buttonBackground,
      borderRadius: 15,
      padding: 5,
    },
    saveButton: {
      backgroundColor: theme.buttonBackground,
      padding: 20,
      borderRadius: 15,
      alignItems: 'center',
      marginTop: 10,
    },
    disabledButton: { opacity: 0.5 },
    saveText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: RFPercentage(2.2),
    },
  })
