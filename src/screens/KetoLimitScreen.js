import React, {useState, useContext} from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";

// import FlashMessage, { showMessage } from "react-native-flash-message";
import DonutFactory from "../charting/DonutFactory";
import TrackerContext from "../state/TrackerContext";

// import {
//   contributionData,
//   data,
//   pieChartData,
//   progressChartData,
//   stackedBarGraphData,
//   stackedBarGraphDataSmaller,
// } from "../data/chartData";

// import { StackedBarChart } from "react-native-chart-kit";
import LineChartContainer from "../charting/LineChartContainer";

// for reference only, this is the old chart config
const chartConfigs = [
  {
    // backgroundColor: "#011000",
    backgroundColor: "black",
    // backgroundColor: "#022173",
    backgroundGradientFrom: "#1E2923",
    // backgroundGradientFrom: "#022173",
    backgroundGradientTo: "#1b3fa0",
    // backgroundColor: "#000000",
    // backgroundGradientFrom: "#1E2923",
    // backgroundGradientTo: "#08130D",
    alignItems: "center",
    justifyContent: "center",

    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: "", // solid background lines with no dashes
      strokeLinecap: "round",
    },
  },
];

const KetoLimitScreen = ({totalCarbsForReals}) => {
  const {width} = Dimensions.get("window");
  const height = 256;
  const {trackerItems} = useContext(TrackerContext);
  return (
    <View style={styles.ketoLimitContainer}>
      <SafeAreaView style={styles.root}>
        <DonutFactory />
        <LineChartContainer trackerItems={trackerItems} />
      </SafeAreaView>
    </View>
  );
};

export default KetoLimitScreen;

const styles = StyleSheet.create({
  ketoLimitContainer: {
    marginTop: 27,
  },
  root: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",

    color: "#FFF",
    fontFamily: "Karla-Light",
  },
});
