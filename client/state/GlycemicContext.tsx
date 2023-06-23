import React from 'react'
const GlycemicContext = React.createContext({
  data: [],
  // setGlycemicData: () => {},
})

export const GlycemicProvider = GlycemicContext.Provider
export default GlycemicContext
