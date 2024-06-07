import React, { memo } from 'react'

import { StyleSheet, Text, View } from 'react-native'

interface BoxesLayoutProps {
  giAmt: number
  glAmt: number
  carbAmt: number
  giBackgroundColor: string
  glBackgroundColor: string
  carbBackgroundColor: string
  boxWidth: number
  boxHeight: number
  textFontSize: number
}

const BoxesLayout = ({
  giAmt,
  glAmt,
  carbAmt,
  giBackgroundColor,
  glBackgroundColor,
  carbBackgroundColor,
  boxWidth,
  boxHeight,
  textFontSize,
}: BoxesLayoutProps) => {
  const dynamicStyles = StyleSheet.create({
    box: {
      width: boxWidth,
      height: boxHeight,
      // padding: 0.5,
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

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 1.5,
        }}
      >
        <View
          style={[dynamicStyles.box, { backgroundColor: carbBackgroundColor }]}
        >
          <Text style={dynamicStyles.text}>{carbAmt}</Text>
        </View>
      </View>
    </View>
  )
}

export default memo(BoxesLayout)
