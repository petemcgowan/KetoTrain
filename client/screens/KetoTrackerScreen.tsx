import React, { useContext, useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
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
import { ItemProps } from '../types/ItemProps'
import { TrackerItemType } from '../components/TrackerItemType'

type TrackerItemProps = {
  item: TrackerItemType
}

const { height, width } = Dimensions.get('screen')

// Database items
// foodName
// foodIndex
// consumptionDateTime
// carbAmount
// glAmount  (for later)
// giAmount  (for later)

// You could store the nutritional info, but I guess that might be better to get a) at startup with everything else b)

const KetoTrackerScreen = () => {
  const { trackerItems, totalCarbs } = useContext(TrackerContext)
  const [trackerSelected, setTrackerSelected] = useState(0)
  const sheetRef = useRef<BottomSheet>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const navigation = useNavigation()
  const [selectedDate, setSelectedDate] = useState(new Date())

  const itemsForSelectedDate = trackerItems.filter((item) => {
    const itemDate = new Date(item.consumptionDate)
    const selected = new Date(selectedDate)
    return (
      itemDate.getFullYear() === selected.getFullYear() &&
      itemDate.getMonth() === selected.getMonth() &&
      itemDate.getDate() === selected.getDate()
    )
  })

  const renderTrackerItem = ({ item }: TrackerItemProps) => (
    <TrackerItem
      item={item}
      setTrackerSelected={setTrackerSelected}
      trackerSelected={trackerSelected}
      clickNutrientPanel={clickNutrientPanel}
    />
  )

  const clickNutrientPanel = () => {
    if (isSheetOpen) {
      sheetRef.current?.snapTo(0) // Assuming 1 is the hidden position
    } else {
      sheetRef.current?.snapTo(1) // Assuming 0 is the open position
    }
    setIsSheetOpen(!isSheetOpen)
  }

  const handleNextDay = () => {
    setSelectedDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1))
    )
  }

  const handlePrevDay = () => {
    setSelectedDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1))
    )
  }

  useEffect(() => {
    console.log('trackerItems' + JSON.stringify(trackerItems))
    const unsubscribeFocus = navigation.addListener('focus', () => {
      console.log('setting Focused to true in Keto Tracker screen')
      setFocused(true)
    })
    const unsubscribeBlur = navigation.addListener('blur', () => {
      setFocused(false)
    })

    return () => {
      unsubscribeFocus()
      unsubscribeBlur()
    }
  }, [navigation, trackerItems, totalCarbs])

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

    /* other styling properties */
  },
  // trackerScreenContainer: {
  //   // flexDirection: 'row',
  //   flex: 1,
  //   backgroundColor: 'black',
  //   color: '#FFF',
  //   // height: 300,
  // },
  ////////////////////////
  // nutritionContainer: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(138, 149, 143, 1)',
  //   color: '#FFF',
  //   height: 300,
  // },
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
