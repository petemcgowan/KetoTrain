import React from 'react'
// import glycemicData from "./data/usdaNutrition.json";

const GlycemicContext = React.createContext({
  data: [],
  // setGlycemicData: () => {},
})

export const GlycemicProvider = GlycemicContext.Provider
export default GlycemicContext
