import React, { useEffect, useRef, useContext } from 'react';
import { Easing, TextInput, Animated, View, StyleSheet } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { ThemeContext } from '../state/ThemeContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface DonutProps {
  percentage: number;
  radius: number;
  strokeWidth: number;
  duration: number;
  color: string;
  textColor: string;
  max: number;
  focused: boolean;
}

export default function CarbDonut({
  percentage,
  radius,
  strokeWidth,
  duration,
  color,
  max,
  textColor,
  focused,
}: DonutProps) {
  const animated = useRef(new Animated.Value(percentage)).current;
  const inputRef = useRef<TextInput>(null);

  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const context = useContext(ThemeContext);
  if (!context) throw new Error('No Theme Context');
  const { theme } = context;
  const styles = getStyles(theme);

  useEffect(() => {
    Animated.timing(animated, {
      toValue: percentage,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();

    const id = animated.addListener(v => {
      if (inputRef.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
        });
      }
    });
    return () => animated.removeAllListeners(id);
  }, [percentage, max, duration]);

  const strokeDashoffset = animated.interpolate({
    inputRange: [0, max],
    outputRange: [circumference, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="white"
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity="0.1"
            fill="none"
          />
          <AnimatedCircle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={strokeDashoffset}
            strokeDasharray={circumference}
            fill="none"
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue={`${Math.round(percentage)}`}
        style={[
          StyleSheet.absoluteFillObject,
          {
            fontSize: radius / 2,
            color: textColor ?? color,
            backgroundColor: 'transparent',
          },
          styles.text,
        ]}
      />
    </View>
  );
}

const getStyles = (theme: any) =>
  StyleSheet.create({ text: { fontWeight: '900', textAlign: 'center' } });
