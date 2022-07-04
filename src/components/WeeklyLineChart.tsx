import React, {FC} from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {G, Line, Path, Svg} from 'react-native-svg';
import {mixPath, ReText} from 'react-native-redash';

import {GraphData} from './LineChartContainer';
import WeekDayButtonSection from './WeekDayButtonSection';

type WeeklyLineChartProps = {
  height: number;
  width: number;
  data: GraphData[];
  leftPadding: number;
  bottomPadding: number;
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

const WeeklyLineChart: FC<WeeklyLineChartProps> = ({
  height,
  width,
  data,
  bottomPadding,
  leftPadding,
}) => {
  const selectedGraph = useSharedValue(data[0]);
  const previousGraph = useSharedValue({...data[0]});
  const isAnimationComplete = useSharedValue(true);
  const transition = useSharedValue(1);

  const onDayTapped = (day: number) => {
    if (isAnimationComplete.value) {
      isAnimationComplete.value = false;
      transition.value = 0;
      selectedGraph.value = data[day - 1];

      transition.value = withTiming(1, {}, () => {
        previousGraph.value = selectedGraph.value;
        isAnimationComplete.value = true;
      });
    }
  };

  const animatedProps = useAnimatedProps(() => {
    return {
      d: mixPath(
        transition.value,
        previousGraph.value.curve,
        selectedGraph.value.curve,
      ),
    };
  });

  const mostRecent = useDerivedValue(() => {
    return `$${selectedGraph.value.mostRecent}`;
  });

  const d1Tapped = () => onDayTapped(1);
  const d2Tapped = () => onDayTapped(2);
  const d3Tapped = () => onDayTapped(3);
  const d4Tapped = () => onDayTapped(4);
  const d5Tapped = () => onDayTapped(5);
  const d6Tapped = () => onDayTapped(6);
  const d7Tapped = () => onDayTapped(7);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>KETO LIMIT</Text>
        <ReText style={styles.priceText} text={mostRecent} />
      </View>
      <Animated.View style={styles.chartContainer}>
        <Svg width={width} height={height} stroke="#c931ff">
          <G y={-bottomPadding}>
            <Line
              x1={leftPadding}
              y1={height}
              x2={width}
              y2={height}
              stroke={'#ceff31'}
              // stroke={'#d7d7d7'}
              strokeWidth="1"
            />
            <Line
              x1={leftPadding}
              y1={height * 0.6}
              x2={width}
              y2={height * 0.6}
              stroke={'#ceff31'}
              // stroke={'#d7d7d7'}
              strokeWidth="1"
            />
            <Line
              x1={leftPadding}
              y1={height * 0.2}
              x2={width}
              y2={height * 0.2}
              stroke={'#ceff31'}
              // stroke={'#d7d7d7'}
              strokeWidth="1"
            />
            <AnimatedPath animatedProps={animatedProps} strokeWidth="2" />
          </G>
        </Svg>
      </Animated.View>
      <WeekDayButtonSection
        d1Tapped={d1Tapped}
        d2Tapped={d2Tapped}
        d3Tapped={d3Tapped}
        d4Tapped={d4Tapped}
        d5Tapped={d5Tapped}
        d6Tapped={d6Tapped}
        d7Tapped={d7Tapped}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    marginHorizontal: 30,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#ceff31',
    // color: 'black',
  },
  priceText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default WeeklyLineChart;
