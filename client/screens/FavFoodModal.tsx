import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import { ThemeContext } from '../state/ThemeContext'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import FavouriteRow from '../components/FavouriteRow'


// Stable unique key; avoids undefined publicFoodKey matching multiple items
const getItemKey = (item: any) =>
  item.publicFoodKey ?? String(item.foodFactsId ?? item.id ?? '')

interface Props {
  isVisible: boolean
  onClose: () => void
  onSave: (selectedFoods: any[]) => void
}

export default function FavFoodModal({ isVisible, onClose, onSave }: Props) {
  const { theme } = useContext(ThemeContext)!
  const styles = useMemo(() => getStyles(theme), [theme])

  const favFoodList = useSelector((state: RootState) => state.favFoodList) || []
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())

  // Reset selection when modal opens
  useEffect(() => {
    if (isVisible) setSelectedKeys(new Set())
  }, [isVisible])

  const toggleSelection = useCallback((item: { publicFoodKey?: string; foodFactsId?: number; id?: string }) => {
    const key = getItemKey(item)
    setSelectedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const selectedItems = useMemo(
    () =>
      favFoodList.filter((item: any) => selectedKeys.has(getItemKey(item))),
    [favFoodList, selectedKeys]
  )

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      const key = getItemKey(item)
      const isSelected = selectedKeys.has(key)
      return (
        <TouchableOpacity
          onPress={() => toggleSelection(item)}
          style={[styles.row, isSelected && styles.selectedRow]}
          activeOpacity={0.7}
        >
          <FavouriteRow
            foodName={item.foodName}
            carbohydrates={item.carbohydrates}
            carbBackgroundColor={item.carbBackgroundColor}
            isSelected={isSelected}
          />
        </TouchableOpacity>
      )
    },
    [selectedKeys, toggleSelection, styles]
  )

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
            keyExtractor={(item) => getItemKey(item)}
            extraData={selectedKeys}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <TouchableOpacity
            style={[
              styles.saveButton,
              selectedKeys.size === 0 && styles.disabledButton,
            ]}
            onPress={() => {
              onSave(selectedItems)
              onClose()
            }}
            disabled={selectedKeys.size === 0}
          >
            <Text style={styles.saveText}>
              ADD SELECTED ({selectedKeys.size})
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
      backgroundColor: 'rgba(255,255,255,0.08)',
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
