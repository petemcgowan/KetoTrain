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

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
const { height, width } = Dimensions.get('screen')

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
  percentage = 75,
  radius = width * 0.35,
  strokeWidth = 10,
  duration = 720,
  color = 'tomato',
  max = 100,
  textColor,
  focused,
}: DonutProps) {
  const animated = useRef(new Animated.Value(0)).current
  const circleRef = useRef()
  const inputRef = useRef()
  const circumference = 2 * Math.PI * radius
  const halfCircle = radius + strokeWidth

  const animation = (toValue: number) => {
    console.log('animation, toValue:' + toValue)
    return Animated.timing(animated, {
      delay: 300,
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
    // animation(percentage) // Start the animation again
  }

  useEffect(() => {
    console.log('CarbDonut useEffect')
    if (focused) {
      console.log('Is focused, run animation')
      animation(percentage) // Run the animation
    } else {
      console.log('Is NOT focused, reset value')
      resetAnimation() // Reset and start the animation
    }
    // animation(percentage)
    animated.addListener(
      (v) => {
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
      }
      // [max, percentage]
    )

    return () => {
      animated.removeAllListeners()
    }
  }, [focused])

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
            fill="transparent"
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
            fill="transparent"
            stroke={color}
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

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
})