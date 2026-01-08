import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Canvas, Circle, BlurMask } from '@shopify/react-native-skia';
import {
  useSharedValue,
  withRepeat,
  withTiming,
  useDerivedValue,
  Easing,
} from 'react-native-reanimated';

interface Props {
  size: number;
  color: string;
}

export const PulsingHint = ({ size, color }: Props) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, []);

  const center = size / 2;
  const maxRadius = size / 2 - 10;

  const r = useDerivedValue(() => {
    return maxRadius * (0.5 + progress.value * 0.5);
  });

  return (
    <View style={{ width: size, height: size }}>
      <Canvas style={{ flex: 1 }}>
        <Circle cx={center} cy={center} r={r} color={color}>
          <BlurMask blur={10} style="normal" />
        </Circle>
      </Canvas>
    </View>
  );
};
