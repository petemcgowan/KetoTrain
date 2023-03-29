import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import TrackerContext from '../state/TrackerContext'
import PortionLayout from './PortionLayout'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { TrackerItemProps } from '../types/ItemTypes'

const TrackerItem = ({
  item,
  setTrackerSelected,
  trackerSelected,
}: TrackerItemProps) => {
  console.log(
    'TrackerItem, item:' +
      JSON.stringify(item) +
      ', trackerSelected:' +
      trackerSelected
  )
  const {
    trackerItems,
    setTrackerItems,
    setTotalCarbs,
    setTotalGILoad,
    totalCarbs,
  } = useContext(TrackerContext)

  //
  // const [portion1, setPortion1] = useState("black");
  // const [portion2, setPortion2] = useState("black");
  // const [portion3, setPortion3] = useState("black");
  // const [portion4, setPortion4] = useState("black");

  const pressTrackerItem = () => {
    console.log(`pressTrackerItem, item name is:${item.description}`)

    const index = trackerItems.findIndex(
      ({ description }) => description === item.description
    )
    if (index > -1) {
      console.log(
        `Item found, index: ${index}, trackerItems: ${JSON.stringify(
          trackerItems[index]
        )}`
      )
      setTrackerSelected(index)
      console.log('trackerSelected:' + JSON.stringify(trackerSelected))
    }
  }

  const deleteTrackerItem = () => {
    console.log('deleteTrackerItem Pressed')
    const index = trackerItems.findIndex(
      ({ description }) => description === item.description
    )
    if (index > -1) {
      console.log(
        `Item found, index: ${index}, trackerItems: ${JSON.stringify(
          trackerItems[index]
        )}`
      )
      trackerItems.splice(index, 1)
    }

    setTrackerItems(trackerItems)
    setTrackerSelected(0)
    let totalCarbs = 0
    let totalGILoad = 0
    trackerItems.map((trackerItem) => {
      totalCarbs += trackerItem.carbAmt
      totalGILoad += trackerItem.giAmt
    })

    setTotalCarbs(totalCarbs)
    setTotalGILoad(totalGILoad)
  }

  useEffect(() => {
    console.log('TrackerItem useEffect called')
    // portion1 is the colour, we need it to reflect the item, so trackerItem needs the
    // if (item.portionAmount > 0) {
    //   item.portion1 = "#7A069B";
    //   console.log("Setting portion colour 1 to" + item.portion1);
    // }
    // if (item.portionAmount > 1) {
    //   item.portion2 = "#620B7B";
    //   console.log("Setting portion colour 2 to" + item.portion2);
    // }
    // if (item.portionAmount > 2) {
    //   item.portion3 = "#370246";
    //   console.log("Setting portion colour 3 to" + item.portion3);
    // }
    // if (item.portionAmount > 3) {
    //   item.portion4 = "#200129";
    //   console.log("Setting portion colour 4 to" + item.portion4);
    // }
  }, [item.portionAmount, totalCarbs])

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <PortionLayout
          portion1BackgroundColor={item.portionAmount > 0 ? '#7A069B' : 'black'}
          portion2BackgroundColor={item.portionAmount > 1 ? '#620B7B' : 'black'}
          portion3BackgroundColor={item.portionAmount > 2 ? '#370246' : 'black'}
          portion4BackgroundColor={item.portionAmount > 3 ? '#200129' : 'black'}
          boxWidth={48}
          boxHeight={48}
          textFontSize={36}
          portionAmount={item.portionAmount}
          itemKey={item.description}
        />
        <TouchableOpacity onPress={pressTrackerItem}>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={deleteTrackerItem}>
            <View>
              <FontAwesome5 name="trash" size={40} color="rgb(124, 131, 134)" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default TrackerItem

const styles = StyleSheet.create({
  description: {
    color: 'rgb(124, 131, 134)',
    alignItems: 'center',
    fontSize: 42,
    fontWeight: '100',
  },
})