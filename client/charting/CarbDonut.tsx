import React, { useContext, useState, useEffect, useRef } from 'react'
import {
  Easing,
  TextInput,
  Animated,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'
import TrackerContext from '../state/TrackerContext'
import { ThemeContext } from '../state/ThemeContext'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
const { width } = Dimensions.get('screen')

interface DonutProps {
  percentage: number
  radius: number
  strokeWidth: number
  duration: number
  color: string
  textColor: string
  max: number
  focused: boolean
}

export default function CarbDonut({
  percentage,
  radius = width * 0.35,
  strokeWidth = 15,
  duration = 720,
  color,
  max = 100,
  textColor,
  focused,
}: DonutProps) {
  const animated = useRef(new Animated.Value(0)).current
  const circleRef = useRef()
  const inputRef = useRef()
  const circumference = 2 * Math.PI * radius
  const halfCircle = radius + strokeWidth
  const { totalCarbs } = useContext(TrackerContext)
  console.log('CarbDonut is rendering, totalCarbs' + totalCarbs)
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  const animation = (toValue: number) => {
    return Animated.timing(animated, {
      delay: 50,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start()
  }

  const resetAnimation = () => {
    if (circleRef?.current) {
      const initialOffset = circumference
      circleRef.current.setNativeProps({
        strokeDashoffset: initialOffset,
      })
    }
    animated.setValue(0) // Reset the Animated Value
  }

  useEffect(() => {
    if (focused) {
      animation(percentage) // Run the animation
    } else {
      resetAnimation() // Reset and start the animation
    }
    animated.addListener((v) => {
      const maxPerc = (100 * v.value) / max
      const strokeDashoffset = circumference - (circumference * maxPerc) / 100
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
        })
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        })
      }
    })

    return () => {
      animated.removeAllListeners()
    }
  }, [focused, totalCarbs])

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            // fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            // fill="transparent"
            // stroke={color}
            stroke={'white'}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 2, color: textColor ?? color },
          styles.text,
        ]}
      />
    </View>
  )
}

const getStyles = (theme) =>
  StyleSheet.create({
    text: { fontWeight: '900', textAlign: 'center' },
  })
