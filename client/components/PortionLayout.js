import React, { memo, useState, useEffect, useContext } from 'react'
import TrackerContext from '../state/TrackerContext'
import { StyleSheet, View, Pressable } from 'react-native'

interface PortionLayoutProps {
  portion1BackgroundColor: string;
  portion2BackgroundColor: string;
  portion3BackgroundColor: string;
  portion4BackgroundColor: string;
  boxWidth: number;
  boxHeight: number;
  textFontSize: number;
  portionCount: number;
  itemKey: string;
}

const PortionLayout = ({
  portion1BackgroundColor,
  portion2BackgroundColor,
  portion3BackgroundColor,
  portion4BackgroundColor,
  boxWidth,
  boxHeight,
  textFontSize,
  portionCount,
  itemKey,
}: PortionLayoutProps) => {
  const [portion1BGColor, setPortion1BGColor] = useState(
    portion1BackgroundColor
  )
  const [portion2BGColor, setPortion2BGColor] = useState(
    portion2BackgroundColor
  )
  const [portion3BGColor, setPortion3BGColor] = useState(
    portion3BackgroundColor
  )
  const [portion4BGColor, setPortion4BGColor] = useState(
    portion4BackgroundColor
  )
  const { trackerItems, setTrackerItems } = useContext(TrackerContext)

  const dynamicStyles = StyleSheet.create({
    box: {
      width: boxWidth,
      height: boxHeight,
      padding: 1,
    },
    text: {
      color: 'rgba(201, 189, 187, 1)',
      fontSize: textFontSize,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: '200',
    },
  })

  const pressPortion1 = () => {
    const trackerClicked = trackerItems.find(
      ({ description }) => description === itemKey
    )

    if (portion1BGColor === 'black') {
      trackerClicked.portionCount++
      setPortion1BGColor(trackerClicked.portionCount > 0 ? '#7A069B' : 'black')
    } else {
      setPortion1BGColor('black')
      trackerClicked.portionCount--
    }
    console.log(
      'pressPortion1, trackerClicked:' + JSON.stringify(trackerClicked)
    )
    setTrackerItems(trackerItems)
  }

  const pressPortion2 = () => {
    const trackerClicked = trackerItems.find(
      ({ description }) => description === itemKey
    )
    if (portion2BGColor === 'black') {
      trackerClicked.portionCount++
      setPortion2BGColor(trackerClicked.portionCount > 1 ? '#620B7B' : 'black')
    } else {
      trackerClicked.portionCount--
      setPortion2BGColor('black')
    }
    console.log(
      'pressPortion2, trackerClicked:' + JSON.stringify(trackerClicked)
    )
    setTrackerItems(trackerItems)
  }

  const pressPortion3 = () => {
    const trackerClicked = trackerItems.find(
      ({ description }) => description === itemKey
    )
    if (portion3BGColor === 'black') {
      trackerClicked.portionCount++
      setPortion3BGColor(trackerClicked.portionCount > 2 ? '#370246' : 'black')
    } else {
      trackerClicked.portionCount--
      setPortion3BGColor('black')
    }
    console.log(
      'pressPortion3, trackerClicked:' + JSON.stringify(trackerClicked)
    )
    setTrackerItems(trackerItems)
  }

  const pressPortion4 = () => {
    const trackerClicked = trackerItems.find(
      ({ description }) => description === itemKey
    )
    if (portion4BGColor === 'black') {
      trackerClicked.portionCount++
      setPortion4BGColor(trackerClicked.portionCount > 3 ? '#200129' : 'black')
    } else {
      trackerClicked.portionCount--
      setPortion4BGColor('black')
    }
    console.log(
      'pressPortion4, trackerClicked:' + JSON.stringify(trackerClicked)
    )
    setTrackerItems(trackerItems)
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', padding: 3 }}>
        <Pressable
          onPress={pressPortion1}
          style={[dynamicStyles.box, { backgroundColor: portion1BGColor }]}
        >
          {/* <Text style={dynamicStyles.text}>{giAmt}</Text> */}
        </Pressable>
        <Pressable
          onPress={pressPortion2}
          style={[dynamicStyles.box, { backgroundColor: portion2BGColor }]}
        >
          {/* <Text style={dynamicStyles.text}>{glAmt}</Text> */}
        </Pressable>
        <Pressable
          onPress={pressPortion3}
          style={[dynamicStyles.box, { backgroundColor: portion3BGColor }]}
        >
          {/* <Text style={dynamicStyles.text}>{carbAmt}</Text> */}
        </Pressable>
        <Pressable
          onPress={pressPortion4}
          style={[dynamicStyles.box, { backgroundColor: portion4BGColor }]}
        >
          {/* <Text style={dynamicStyles.text}>{carbAmt}</Text> */}
        </Pressable>
      </View>
    </View>
  )
}

export default memo(PortionLayout)
