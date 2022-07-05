import React from "react";

const TrackerContext = React.createContext({
  trackerItems: [],
  setTrackerItems: () => {},
  totalCarbs: 0,
  setTotalCarbs: () => {},
  totalGILoad: 0,
  setTotalGILoad: () => {},
  // trackerSelected: trackerItems[0];
  // setTrackerSelected () => {},
});

export const TrackerProvider = TrackerContext.Provider;
export default TrackerContext;
