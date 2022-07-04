// Mock data object used for LineChart and BarChart

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [-50, -20, -2, 86, 71, 100],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
    },
    {
      data: [20, 10, 4, 56, 87, 90],
      color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`, // optional
    },
    {
      data: [30, 90, 67, 54, 10, 2],
    },
  ],
  legend: ["Rainy Days", "Sunny Days", "Snowy Days"], // optional
};

const stackedBarGraphData = {
  labels: ["Test1", "Test2"],
  legend: ["L1", "L2", "L3"],
  data: [
    [60, 60, 60],
    [30, 30, 60],
  ],
  barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
};

const stackedBarGraphDataSmaller = {
  labels: ["Carbs"],
  data: [[60, 60, 60]],
  barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
};

export { data, stackedBarGraphData, stackedBarGraphDataSmaller };
