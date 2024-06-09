import React, {
  useContext,
  useEffect,
  useRef,
  useReducer,
  useCallback,
} from 'react'
import { Pressable, Text, StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

export const SimpleTabBarComponent = ({
  active,
  options,
  onLayout,
  onPress,
  label,
}) => {
  const ref = useRef(null)

  useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play()
    }
  }, [active])

  // animations
  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 180 }),
        },
      ],
    }
  })

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 180 }),
    }
  })

  return (
    <Pressable
      onPress={onPress}
      onLayout={onLayout}
      style={{ padding: 20, width: 50, height: 50 }}
    >
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View
        style={[styles.iconContainer, animatedIconContainerStyles]}
      >
        {/* @ts-ignore */}
        {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>}
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  componentCircle: {
    flex: 1,
    borderRadius: 30,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  component: {
    height: 60,
    width: 60,
    marginTop: -5,
  },
})
