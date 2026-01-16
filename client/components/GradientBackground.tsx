import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Dimensions, Platform } from 'react-native'
import { Canvas, Rect, LinearGradient, vec } from '@shopify/react-native-skia'
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated'
import { ThemeContext } from '../state/ThemeContext'

const { width, height } = Dimensions.get('window')

// Detect Simulator (Basic check)
const ENABLE_ANIMATION = !__DEV__

interface Props {
  children: React.ReactNode
}

const GradientBackground = ({ children }: Props) => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('No Theme Context')
  const { theme } = context

  const t = useSharedValue(0)

  useEffect(() => {
    if (ENABLE_ANIMATION) {
      t.value = withRepeat(
        withTiming(1, { duration: 10000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      )
    } else {
      // Static position for dev
      t.value = 0.5
    }
  }, [])

  const startVec = useDerivedValue(() => {
    return vec(0, t.value * 300)
  })

  const endVec = useDerivedValue(() => {
    return vec(width, height - t.value * 100)
  })

  const colors =
    theme.viewBackground === '#ffffff' || theme.viewBackground === 'white'
      ? ['#f0f0f0', '#e0e0e0', '#ffffff']
      : [theme.viewBackground, theme.buttonBackground, '#000000']

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <Canvas style={{ flex: 1 }}>
          <Rect x={0} y={0} width={width} height={height}>
            <LinearGradient start={startVec} end={endVec} colors={colors} />
          </Rect>
        </Canvas>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  )
}

export default GradientBackground

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, zIndex: 1 },
})
