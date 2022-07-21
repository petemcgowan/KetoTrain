import TrackerContext from "../state/TrackerContext";
import React, {useContext} from "react";

export const getGLResult = (carbAmt, giAmt) => {
  const carbsRatio = +carbAmt / 100;
  const unit = "g"; // hard coding for now
  const servingFactor = {g: 1, oz: 28.3495231}[unit];
  const serving = 100; // hard coding for now

  let glAmt = (giAmt * serving * carbsRatio * servingFactor) / 100;
  glAmt = Math.round(glAmt * 100) / 100; //round 2 decimals

  return glAmt;
};

// Total Carbs: calculated
export const getTotalCarbs = () => {
  const {trackerItems} = useContext(TrackerContext);
  let totalCarbs = 0;
  trackerItems.map(trackerItem => {
    totalCarbs += trackerItem.carbAmt;
  });

  return totalCarbs;
};

export const getTotalGILoad = () => {
  const {trackerItems} = useContext(TrackerContext);
  let totalGILoad = 0;
  trackerItems.map(trackerItem => {
    totalGILoad += trackerItem.glAmt;
  });

  return totalGILoad;
};
