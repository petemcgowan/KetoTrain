import React, { useContext } from 'react';
import { ScrollView, View, StyleSheet, Text, Dimensions } from 'react-native';
import { CartesianChart, Bar } from 'victory-native';
import { useFont } from '@shopify/react-native-skia';
import { ThemeContext } from '../state/ThemeContext';
import { TrackerItemType } from '../types/TrackerItemType';

const karlaFont = require('../assets/fonts/Karla-Light.ttf');
const { width } = Dimensions.get('window');

type Props = {
  trackerItems: TrackerItemType[];
};

const EnergyChart: React.FC<Props> = ({ trackerItems }) => {
  const { theme } = useContext(ThemeContext)!;
  const font = useFont(karlaFont, 12);

  function getDateString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // Group by consumptionDate
  const groupedByDate: { [date: string]: number } = {};
  trackerItems.forEach(item => {
    const d = new Date(item.consumptionDate);
    if (!isNaN(d.getTime())) {
      const dateStr = getDateString(d);
      if (!groupedByDate[dateStr]) groupedByDate[dateStr] = 0;
      groupedByDate[dateStr] += item.energyAmt;
    }
  });

  // Get last 7 days
  const last7DaysData: any[] = [];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = getDateString(d);
    const dayName = dayLabels[d.getDay()];

    last7DaysData.push({
      xIndex: 6 - i, // 0 to 6
      y: groupedByDate[dateStr] || 0,
      label: dayName,
    });
  }

  if (!font)
    return (
      <View style={{ height: 250 }}>
        <Text style={{ color: 'white' }}>Loading Chart...</Text>
      </View>
    );

  return (
    <View style={styles.chartContainer}>
      <CartesianChart
        data={last7DaysData}
        xKey="xIndex"
        yKeys={['y']}
        domainPadding={{ left: 20, right: 20, top: 20 }}
        axisOptions={{
          font,
          lineColor: theme.buttonText,
          labelColor: theme.buttonText,
          tickCount: 7,
          formatXLabel: value => {
            const index = Math.round(value);
            return last7DaysData[index]?.label || '';
          },
        }}
      >
        {({ points, chartBounds }) => (
          <Bar
            points={points.y}
            chartBounds={chartBounds}
            color="#c43a31"
            roundedCorners={{ topLeft: 6, topRight: 6 }}
            barWidth={25}
            animate={{ type: 'spring' }}
          />
        )}
      </CartesianChart>
    </View>
  );
};

export default EnergyChart;

const styles = StyleSheet.create({
  chartContainer: {
    height: 250,
    width: width * 0.85, // Responsive Width
    alignSelf: 'center',
    marginVertical: 10,
  },
});
