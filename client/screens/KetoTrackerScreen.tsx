import React, { useContext, useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Button,
  Text,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TrackerContext from '../state/TrackerContext'
import TrackerItem from '../components/TrackerItem'
import CarbCircleChart from '../charting/CarbCircleChart'
import NutrientBottomSheet from './NutrientBottomSheet'
import BottomSheet from 'reanimated-bottom-sheet'
import { TrackerItemType } from '../types/TrackerItemType'

type TrackerItemProps = {
  item: TrackerItemType
}

const KetoTrackerScreen = () => {
  const {
    trackerItems,
    totalCarbs,
    selectedDate,
    handlePrevDay,
    handleNextDay,
    setSelectedDate,
    setTotalCarbs,
    itemsForSelectedDate,
    setItemsForSelectedDate,
  } = useContext(TrackerContext)
  const [trackerSelected, setTrackerSelected] = useState(0)
  const sheetRef = useRef<BottomSheet>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const navigation = useNavigation()

  const renderTrackerItem = ({ item, index }: TrackerItemProps) => (
    <TrackerItem
      item={item}
      index={index}
      setTrackerSelected={setTrackerSelected}
      trackerSelected={trackerSelected}
      clickNutrientPanel={clickNutrientPanel}
    />
  )

  const clickNutrientPanel = (item: TrackerItemType, index: number) => {
    console.log('clickNutrientPanel, index:' + index)
    if (index > -1) {
      setTrackerSelected(index)
    }
    console.log('clickNutrientPanel, item.carbAmt:' + item.carbAmt)
    if (isSheetOpen) {
      sheetRef.current?.snapTo(0)
    } else {
      sheetRef.current?.snapTo(1)
    }
    setIsSheetOpen(!isSheetOpen)
  }

  useEffect(() => {
    console.log('KetoTrackerScreen, useEffect')
    const unsubscribeFocus = navigation.addListener('focus', () => {
      setFocused(true)
    })
    const unsubscribeBlur = navigation.addListener('blur', () => {
      setFocused(false)
    })

    setItemsForSelectedDate(
      trackerItems.filter((item) => {
        const itemDate = new Date(item.consumptionDate)
        const selected = new Date(selectedDate)
        return (
          itemDate.getFullYear() === selected.getFullYear() &&
          itemDate.getMonth() === selected.getMonth() &&
          itemDate.getDate() === selected.getDate()
        )
      })
    )

    return () => {
      unsubscribeFocus()
      unsubscribeBlur()
    }
  }, [navigation, trackerItems, totalCarbs, selectedDate])

  return (
    <SafeAreaView style={styles.trackerContainer}>
      <View style={styles.dateHeader}>
        <Button title="<" onPress={handlePrevDay} />
        <Text style={{ color: 'white', fontSize: 20 }}>
          {selectedDate.toDateString()}
        </Text>
        <Button title=">" onPress={handleNextDay} />
      </View>

      <FlatList
        data={itemsForSelectedDate}
        renderItem={renderTrackerItem}
        keyExtractor={(item) => item.id}
      />
      <CarbCircleChart focused={focused} />
      <View style={{ flex: 1 }}>
        <NutrientBottomSheet
          sheetRef={sheetRef}
          clickNutrientPanel={clickNutrientPanel}
          trackerSelected={trackerSelected}
        />
      </View>
    </SafeAreaView>
  )
}

export default KetoTrackerScreen

const styles = StyleSheet.create({
  trackerContainer: {
    flex: 1,
    backgroundColor: 'black',
    color: '#FFF',
    // marginTop: 27,
    // height: height * 0.4,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  //////////////////////////////////
  panel: {
    // backgroundColor: 'green', //temp
    backgroundColor: 'rgb(32, 32, 32)',
    // height: height * 0.4,
    padding: 20,
  },
  panelHeader: {
    // backgroundColor: 'yellow', //temp
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  panelTitle: {
    fontSize: 20,
    color: 'rgb(2, 158, 147)',
    textAlign: 'center',
  },
  panelContent: {
    // backgroundColor: 'red', //temp
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  panelFooter: {
    // backgroundColor: 'pink', //temp
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    // backgroundColor: 'blue', //temp
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(27, 46, 46)',
    padding: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textTransform: 'uppercase',
  },
})
