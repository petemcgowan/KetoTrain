import React, { useState, memo, useContext } from 'react'

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import BoxesLayout from './BoxesLayout'

import TrackerContext from '../state/TrackerContext'
// import GlycemicContext from '../state/GlycemicContext'

const GlycemicItem = ({
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
  const [modalVisible, setModalVisible] = useState(false)
  const { trackerItems, setTrackerItems } = useContext(TrackerContext)
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
        console.log('descriptionGI:' + descriptionGI)
        const trackerClicked = trackerItems.find(
          ({ description }) => description === descriptionGI
        )
        console.log('trackerClicked:' + JSON.stringify(trackerClicked))
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
            },
          ])
        } // if
        let totalCarbs = 0
        let totalGILoad = 0
        trackerItems.map((trackerItem) => {
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

function arePropsEqual(prevProps, nextProps) {
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
    // backgroundColor: 'red',
    fontWeight: '200',
    color: 'rgba(201, 189, 187, 1)',
  },
})
