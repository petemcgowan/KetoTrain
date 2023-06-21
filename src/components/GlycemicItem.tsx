import React, { useState, memo, useContext } from 'react'

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import BoxesLayout from './BoxesLayout'

import TrackerContext from '../state/TrackerContext'
// import GlycemicContext from '../state/GlycemicContext'
import { TrackerItemType } from './TrackerItemType'
import { TrackerContextType } from '../state/TrackerContextType'

interface GlycemicItemProps {
  descriptionGI: string
  setTotalCarbs: (value: number) => void
  setTotalGILoad: (value: number) => void
  carbAmt: number
  giAmt: number
  glAmt: number
  fiberAmt: number
  proteinAmt: number
  fatAmt: number
  energyAmt: number
  sugarsAmt: number
  sodiumAmt: number
  animatedOpacitySequence: () => void
  setSearchItemSelected: (index: number) => void
  searchItemSelected: number
  glycemicData: Array<any> // replace 'any' with appropriate type for your data
}

const GlycemicItem: React.FC<GlycemicItemProps> = ({
  descriptionGI,
  setTotalCarbs,
  setTotalGILoad,
  carbAmt,
  giAmt,
  glAmt,
  fiberAmt,
  proteinAmt,
  fatAmt,
  energyAmt,
  sugarsAmt,
  sodiumAmt,
  animatedOpacitySequence,
  setSearchItemSelected,
  searchItemSelected,
  glycemicData,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const { trackerItems, setTrackerItems } =
    useContext<TrackerContextType>(TrackerContext)

  // const { glycemicData } = useContext(GlycemicContext)

  let giBackgroundColor = '#350244'
  if (glAmt > 60) {
    giBackgroundColor = '#1A0546'
  } else if (glAmt > 30) {
    giBackgroundColor = '#5C6500'
  }

  let glBackgroundColor = '#350244'
  if (glAmt > 19) {
    glBackgroundColor = '#1A0546'
  } else if (glAmt > 10) {
    glBackgroundColor = '#5C6500'
  }

  // Carb ranges (keto watch outs)
  let carbBackgroundColor = '#350244'
  if (carbAmt > 22) {
    carbBackgroundColor = '#1A0546'
  } else if (carbAmt > 11) {
    carbBackgroundColor = '#5C6500'
  }

  const dynamicStyles = StyleSheet.create({
    listItemContainerStyle: {
      borderColor: 'white',
      borderWidth: 1,
      flexDirection: 'row',
      backgroundColor: carbBackgroundColor,
      alignItems: 'center',
    },
  })

  return (
    <TouchableOpacity
      onPress={() => {
        const trackerClicked = trackerItems.find(
          (item: TrackerItemType) => item.description === descriptionGI
        )
        if (trackerClicked) {
          trackerClicked.portionAmount++
        } else {
          setTrackerItems([
            ...trackerItems,
            {
              id: descriptionGI,
              description: descriptionGI,
              carbAmt: carbAmt,
              giAmt: giAmt,
              glAmt: glAmt,
              fiberAmt: fiberAmt,
              proteinAmt: proteinAmt,
              fatAmt: fatAmt,
              energyAmt: energyAmt,
              sugarsAmt: sugarsAmt,
              sodiumAmt: sodiumAmt,
              giBackgroundColor: giBackgroundColor,
              glBackgroundColor: glBackgroundColor,
              carbBackgroundColor: carbBackgroundColor,
              portionAmount: 1,
              consumptionDate: new Date(),
            },
          ])
        } // if
        let totalCarbs = 0
        let totalGILoad = 0
        trackerItems.map((trackerItem: TrackerItemType) => {
          totalCarbs += trackerItem.carbAmt
          totalGILoad += trackerItem.glAmt
        })

        setTotalCarbs(totalCarbs)
        setTotalGILoad(totalGILoad)
        // setModalVisible(true);
        const index = glycemicData.findIndex(
          ({ description }) => description === descriptionGI
        )
        if (index > -1) {
          setSearchItemSelected(index)
        }
        // Make the nutritional panel appear briefly here
        animatedOpacitySequence()
      }}
    >
      <View style={dynamicStyles.listItemContainerStyle}>
        <Text style={styles.listItemStyle}>{descriptionGI}</Text>
        <BoxesLayout
          giAmt={giAmt}
          glAmt={glAmt}
          carbAmt={carbAmt}
          giBackgroundColor={giBackgroundColor}
          glBackgroundColor={glBackgroundColor}
          carbBackgroundColor={carbBackgroundColor}
          boxWidth={48}
          boxHeight={48}
          textFontSize={30}
        />
      </View>
    </TouchableOpacity>
  )
}

function arePropsEqual(
  prevProps: GlycemicItemProps,
  nextProps: GlycemicItemProps
): boolean {
  return prevProps.descriptionGI === nextProps.descriptionGI
}
export default memo(GlycemicItem, arePropsEqual)

const styles = StyleSheet.create({
  listItemStyle: {
    width: '63%',
    textAlign: 'right',
    borderRightColor: 'pink',
    borderRightWidth: 1,
    fontSize: 30,
    fontWeight: '200',
    color: 'rgba(201, 189, 187, 1)',
  },
})
