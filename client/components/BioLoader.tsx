import React, { useMemo, useEffect } from 'react';
import { View, useWindowDimensions } from 'react-native';
import {
  BlurMask,
  vec,
  Canvas,
  Circle,
  Group,
  polar2Canvas,
  mix,
} from '@shopify/react-native-skia';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useDerivedValue,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

const useLoop = ({ duration }: { duration: number }) => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
    return () => cancelAnimation(progress);
  }, [duration, progress]);
  return progress;
};

const c1 = '#4ecdc4';
const c2 = '#2196F3';

export const BioLoader = () => {
  const { width } = useWindowDimensions();
  const size = width * 0.5;
  const center = useMemo(() => vec(size / 2, size / 2), [size]);
  const R = size / 3;
  const progress = useLoop({ duration: 2000 });

  return (
    <View style={{ width: size, height: size }}>
      <Canvas style={{ flex: 1 }}>
        <Group origin={center} blendMode="screen">
          <BlurMask style="solid" blur={20} />
          {new Array(6).fill(0).map((_, index) => {
            const transform = useDerivedValue(() => {
              const theta = (index * (2 * Math.PI)) / 6;
              const rotation = mix(progress.value, 0, Math.PI);
              const { x, y } = polar2Canvas(
                { theta: theta + rotation, radius: R },
                { x: 0, y: 0 },
              );
              const scale = mix(progress.value, 0.5, 1.2);
              return [{ translateX: x }, { translateY: y }, { scale }];
            });
            return (
              <Circle
                key={index}
                c={center}
                r={R / 2}
                color={index % 2 ? c1 : c2}
                origin={center}
                transform={transform}
              />
            );
          })}
        </Group>
      </Canvas>
    </View>
  );
};
