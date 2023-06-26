import {LayoutChangeEvent} from 'react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';

export type TabBarComponentProps = {
  active?: boolean;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
};
