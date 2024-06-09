import {
  BottomTabNavigationOptions,
  // BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
// import { ParamListBase } from '@react-navigation/core'
import { LayoutChangeEvent } from 'react-native'

export type TabBarComponentProps = {
  active?: boolean
  options: BottomTabNavigationOptions
  onLayout: (e: LayoutChangeEvent) => void
  onPress: () => void
  label: string
  // navigation: BottomTabNavigationProp<ParamListBase>
}
