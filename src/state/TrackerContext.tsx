import React from 'react'
// import glycemicData from "./data/usdaNutrition.json";
const TrackerContext = React.createContext({
    trackerItems: [],
    setTrackerItems: () => {},
    totalCarbs: 0,
    setTotalCarbs: () => {},
    totalGILoad: 0,
    setTotalGILoad: () => {},
    // data: [],
    // glycemicData: glycemicData,

    // setFoodNutritionsNew: () => {},
    // trackerSelected: trackerItems[0];
    // setTrackerSelected () => {},
})

export const TrackerProvider = TrackerContext.Provider
export default TrackerContext
