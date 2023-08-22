import React, { createContext, useState } from 'react'

type Theme = {
  viewBackground: string
  buttonBackground: string
  buttonText: string
  iconFill: string
  tableBackground: string
  tableLineColor: string
  navigationBackground: string
  navigationIcon: string
  middlingBackground: string
  badBackground: string
  tabBackground: string
  activeTabBackground: string
  inactiveTabIcon: string
  activeTabIcon: string
  tabHeaderText: string
  tabHeaderBackground: string
  tabIconCircleBackground: string
  tabIconBorderFill: string
  goodText: string
  middlingText: string
  badText: string
}

type ThemeStyles = {
  analogous2: Theme
  complementary: Theme
  earthy: Theme
  splitComplementary2: Theme
  sunset: Theme
  triadic: Theme
  monochromatic: Theme
  // analogous: Theme
  // monochromatic2: Theme
  // splitComplementary: Theme
  tetradic: Theme
  analogous3: Theme
}

export const themes: ThemeStyles = {
  analogous2: {
    viewBackground: 'rgb(39, 61, 60)',
    buttonBackground: 'rgb(9, 21, 39)',
    buttonText: 'rgb(255, 255, 255)',
    iconFill: 'rgb(190, 190, 190)',
    tableBackground: 'rgb(45, 36, 34)',
    tableLineColor: 'rgb(14, 24, 28)',
    navigationBackground: 'rgb(25, 26, 29)',
    navigationIcon: 'rgb(255, 255, 255)',
    middlingBackground: 'rgb(65, 55, 50)',
    badBackground: 'rgb(50, 30, 20)',
    tabBackground: 'rgb(20, 40, 60)',
    activeTabBackground: 'rgb(25, 50, 75)',
    inactiveTabIcon: 'rgb(160, 160, 160)',
    activeTabIcon: 'rgb(255, 255, 255)',
    tabHeaderText: 'rgb(255, 255, 255)',
    tabHeaderBackground: 'rgb(25, 26, 29)',
    tabIconCircleBackground: 'rgb(30, 60, 90)',
    tabIconBorderFill: 'rgb(10, 20, 30)',
    goodText: 'rgb(230, 230, 230)',
    middlingText: 'rgb(120, 100, 90)',
    badText: 'rgb(150, 50, 40)',
  },
  complementary: {
    viewBackground: 'rgb(25, 50, 75)',
    buttonBackground: 'rgb(255, 165, 0)',
    buttonText: 'rgb(255, 255, 255)',
    iconFill: 'rgb(255, 255, 255)',
    tableBackground: 'rgb(15, 30, 45)',
    tableLineColor: 'rgb(255, 165, 0)',
    navigationBackground: 'rgb(20, 40, 60)',
    navigationIcon: 'rgb(255, 255, 255)',
    middlingBackground: 'rgb(100, 60, 25)',
    badBackground: 'rgb(75, 25, 25)',
    tabBackground: 'rgb(20, 40, 60)',
    activeTabBackground: 'rgb(30, 60, 90)',
    inactiveTabIcon: 'rgb(180, 180, 180)',
    activeTabIcon: 'rgb(255, 255, 255)',
    tabHeaderText: 'rgb(255, 255, 255)',
    tabHeaderBackground: 'rgb(25, 50, 75)',
    tabIconCircleBackground: 'rgb(50, 100, 150)',
    tabIconBorderFill: 'rgb(15, 30, 45)',
    goodText: 'rgb(230, 230, 230)',
    middlingText: 'rgb(120, 100, 75)',
    badText: 'rgb(175, 35, 15)',
  },
  earthy: {
    viewBackground: 'rgb(63, 42, 20)',
    buttonBackground: 'rgb(87, 58, 27)',
    buttonText: 'rgb(255, 255, 255)',
    iconFill: 'rgb(234, 216, 179)',
    tableBackground: 'rgb(53, 35, 17)',
    tableLineColor: 'rgb(93, 64, 30)',
    navigationBackground: 'rgb(46, 30, 15)',
    navigationIcon: 'rgb(255, 255, 255)',
    middlingBackground: 'rgb(130, 94, 57)',
    badBackground: 'rgb(87, 30, 15)',
    tabBackground: 'rgb(76, 52, 26)',
    activeTabBackground: 'rgb(87, 58, 27)',
    inactiveTabIcon: 'rgb(210, 190, 157)',
    activeTabIcon: 'rgb(255, 255, 255)',
    tabHeaderText: 'rgb(255, 255, 255)',
    tabHeaderBackground: 'rgb(63, 42, 20)',
    tabIconCircleBackground: 'rgb(100, 70, 35)',
    tabIconBorderFill: 'rgb(40, 26, 13)',
    goodText: 'rgb(240, 240, 220)',
    middlingText: 'rgb(180, 150, 120)',
    badText: 'rgb(140, 30, 15)',
  },
  splitComplementary2: {
    viewBackground: 'rgb(70, 130, 180)', // steelblue
    buttonBackground: 'rgb(255, 105, 180)', // hotpink
    buttonText: 'rgb(255, 255, 255)', // white
    iconFill: 'rgb(255, 20, 147)', // deeppink
    tableBackground: 'rgb(135, 206, 250)', // lightskyblue
    tableLineColor: 'rgb(240, 128, 128)', // lightcoral
    navigationBackground: 'rgb(100, 149, 237)', // cornflowerblue
    navigationIcon: 'rgb(255, 255, 255)', // white
    middlingBackground: 'rgb(255, 99, 71)', // tomato
    badBackground: 'rgb(178, 34, 34)', // firebrick
    tabBackground: 'rgb(176, 224, 230)', // powderblue
    activeTabBackground: 'rgb(240, 128, 128)', // lightcoral
    inactiveTabIcon: 'rgb(70, 130, 180)', // steelblue
    activeTabIcon: 'rgb(255, 255, 255)', // white
    tabHeaderText: 'rgb(255, 255, 255)', // white
    tabHeaderBackground: 'rgb(255, 105, 180)', // hotpink
    tabIconCircleBackground: 'rgb(176, 224, 230)', // powderblue
    tabIconBorderFill: 'rgb(240, 128, 128)', // lightcoral
    goodText: 'rgb(240, 240, 240)',
    middlingText: 'rgb(200, 85, 140)',
    badText: 'rgb(205, 20, 40)',
  },
  sunset: {
    viewBackground: 'rgb(202, 107, 75)',
    buttonBackground: 'rgb(230, 126, 87)',
    buttonText: 'rgb(255, 255, 255)',
    iconFill: 'rgb(255, 215, 181)',
    tableBackground: 'rgb(181, 95, 67)',
    tableLineColor: 'rgb(238, 137, 96)',
    navigationBackground: 'rgb(162, 85, 58)',
    navigationIcon: 'rgb(255, 255, 255)',
    middlingBackground: 'rgb(238, 155, 120)',
    badBackground: 'rgb(155, 60, 50)',
    tabBackground: 'rgb(216, 117, 83)',
    activeTabBackground: 'rgb(230, 126, 87)',
    inactiveTabIcon: 'rgb(255, 205, 166)',
    activeTabIcon: 'rgb(255, 255, 255)',
    tabHeaderText: 'rgb(255, 255, 255)',
    tabHeaderBackground: 'rgb(202, 107, 75)',
    tabIconCircleBackground: 'rgb(245, 146, 107)',
    tabIconBorderFill: 'rgb(144, 76, 53)',
    goodText: 'rgb(245, 245, 230)',
    middlingText: 'rgb(215, 120, 95)',
    badText: 'rgb(180, 40, 35)',
  },
  triadic: {
    viewBackground: 'rgb(255, 102, 102)', // light red
    buttonBackground: 'rgb(204, 0, 0)', // dark red
    buttonText: 'rgb(255, 255, 255)', // white
    iconFill: 'rgb(255, 204, 102)', // light yellow
    tableBackground: 'rgb(153, 0, 0)', // very dark red
    tableLineColor: 'rgb(255, 255, 102)', // yellow
    navigationBackground: 'rgb(255, 153, 153)', // very light red
    navigationIcon: 'rgb(255, 255, 255)', // white
    middlingBackground: 'rgb(102, 178, 255)', // light blue
    badBackground: 'rgb(0, 76, 153)', // dark blue
    tabBackground: 'rgb(0, 128, 255)', // blue
    activeTabBackground: 'rgb(0, 51, 102)', // very dark blue
    inactiveTabIcon: 'rgb(204, 204, 0)', // dark yellow
    activeTabIcon: 'rgb(255, 255, 153)', // very light yellow
    tabHeaderText: 'rgb(255, 255, 255)', // white
    tabHeaderBackground: 'rgb(204, 0, 0)', // dark red
    tabIconCircleBackground: 'rgb(0, 128, 255)', // blue
    tabIconBorderFill: 'rgb(255, 102, 102)', // light red
    goodText: 'rgb(240, 240, 240)',
    middlingText: 'rgb(140, 130, 120)',
    badText: 'rgb(205, 10, 10)',
  },
  ///////////////////******************** */
  monochromatic: {
    // is this the best?
    viewBackground: 'rgb(25, 50, 75)',
    buttonBackground: 'rgb(30, 60, 90)',
    buttonText: 'rgb(255, 255, 255)',
    iconFill: 'rgb(240, 240, 240)',
    tableBackground: 'rgb(20, 40, 60)',
    tableLineColor: 'rgb(40, 80, 120)',
    navigationBackground: 'rgb(15, 30, 45)',
    navigationIcon: 'rgb(255, 255, 255)',
    middlingBackground: 'rgb(75, 50, 25)',
    badBackground: 'rgb(75, 25, 25)',
    tabBackground: 'rgb(30, 60, 90)',
    activeTabBackground: 'rgb(40, 80, 120)',
    inactiveTabIcon: 'rgb(180, 180, 180)',
    activeTabIcon: 'rgb(255, 255, 255)',
    tabHeaderText: 'rgb(255, 255, 255)',
    tabHeaderBackground: 'rgb(30, 60, 90)',
    tabIconCircleBackground: 'rgb(50, 100, 150)',
    tabIconBorderFill: 'rgb(15, 30, 45)',
    goodText: 'rgb(250, 250, 250)',
    middlingText: 'rgb(100, 150, 200)',
    badText: 'rgb(150, 50, 50)',
  },
  // analogous: {
  //   viewBackground: 'rgb(25, 50, 75)',
  //   buttonBackground: 'rgb(20, 40, 60)',
  //   buttonText: 'rgb(255, 255, 255)',
  //   iconFill: 'rgb(240, 240, 240)',
  //   tableBackground: 'rgb(30, 60, 90)',
  //   tableLineColor: 'rgb(15, 30, 45)',
  //   navigationBackground: 'rgb(20, 40, 60)',
  //   navigationIcon: 'rgb(255, 255, 255)',
  //   middlingBackground: 'rgb(80, 70, 30)',
  //   badBackground: 'rgb(75, 50, 25)',
  //   tabBackground: 'rgb(25, 50, 75)',
  //   activeTabBackground: 'rgb(20, 40, 60)',
  //   inactiveTabIcon: 'rgb(180, 180, 180)',
  //   activeTabIcon: 'rgb(255, 255, 255)',
  //   tabHeaderText: 'rgb(255, 255, 255)',
  //   tabHeaderBackground: 'rgb(20, 40, 60)',
  //   tabIconCircleBackground: 'rgb(40, 80, 120)',
  //   tabIconBorderFill: 'rgb(10, 20, 30)',
  //   goodText: 'rgb(250, 250, 250)',
  //   middlingText: 'rgb(80, 110, 140)',
  //   badText: 'rgb(150, 80, 60)',
  // },
  // monochromatic2: {// no
  //   viewBackground: 'rgb(14, 24, 28)',
  //   buttonBackground: 'rgb(9, 21, 39)',
  //   buttonText: 'rgb(255, 255, 255)',
  //   iconFill: 'rgb(38, 27, 21)',
  //   tableBackground: 'rgb(39, 61, 60)',
  //   tableLineColor: 'rgb(25, 26, 29)',
  //   navigationBackground: 'rgb(45, 36, 34)',
  //   navigationIcon: 'rgb(255, 255, 255)',
  //   middlingBackground: 'rgb(70, 60, 55)',
  //   badBackground: 'rgb(50, 20, 20)',
  //   tabBackground: 'rgb(20, 40, 60)',
  //   activeTabBackground: 'rgb(25, 50, 75)',
  //   inactiveTabIcon: 'rgb(160, 160, 160)',
  //   activeTabIcon: 'rgb(255, 255, 255)',
  //   tabHeaderText: 'rgb(255, 255, 255)',
  //   tabHeaderBackground: 'rgb(14, 24, 28)',
  //   tabIconCircleBackground: 'rgb(30, 60, 90)',
  //   tabIconBorderFill: 'rgb(8, 16, 24)',
  //   goodText: 'rgb(245, 245, 245)',
  //   middlingText: 'rgb(80, 100, 110)',
  //   badText: 'rgb(150, 40, 40)',
  // },
  // splitComplementary: {// no
  //   viewBackground: 'rgb(14, 24, 28)',
  //   buttonBackground: 'rgb(38, 27, 21)',
  //   buttonText: 'rgb(255, 255, 255)',
  //   iconFill: 'rgb(45, 36, 34)',
  //   tableBackground: 'rgb(39, 61, 60)',
  //   tableLineColor: 'rgb(25, 26, 29)',
  //   navigationBackground: 'rgb(9, 21, 39)',
  //   navigationIcon: 'rgb(255, 255, 255)',
  //   middlingBackground: 'rgb(90, 70, 35)',
  //   badBackground: 'rgb(60, 20, 20)',
  //   tabBackground: 'rgb(20, 40, 60)',
  //   activeTabBackground: 'rgb(30, 60, 90)',
  //   inactiveTabIcon: 'rgb(160, 160, 160)',
  //   activeTabIcon: 'rgb(255, 255, 255)',
  //   tabHeaderText: 'rgb(255, 255, 255)',
  //   tabHeaderBackground: 'rgb(14, 24, 28)',
  //   tabIconCircleBackground: 'rgb(35, 70, 105)',
  //   tabIconBorderFill: 'rgb(10, 20, 30)',
  //   goodText: 'rgb(245, 245, 245)',
  //   middlingText: 'rgb(70, 90, 100)',
  //   badText: 'rgb(150, 70, 35)',
  // },
  tetradic: {
    // no  or well you know it's radical!
    viewBackground: 'rgb(255, 102, 102)', // light red
    buttonBackground: 'rgb(204, 0, 0)', // dark red
    buttonText: 'rgb(255, 255, 255)', // white
    iconFill: 'rgb(0, 128, 255)', // blue
    tableBackground: 'rgb(153, 0, 0)', // very dark red
    tableLineColor: 'rgb(0, 153, 153)', // green
    navigationBackground: 'rgb(255, 153, 153)', // very light red
    navigationIcon: 'rgb(255, 255, 255)', // white
    middlingBackground: 'rgb(102, 178, 255)', // light blue
    badBackground: 'rgb(255, 128, 0)', // orange
    tabBackground: 'rgb(0, 76, 153)', // dark blue
    activeTabBackground: 'rgb(0, 51, 102)', // very dark blue
    inactiveTabIcon: 'rgb(102, 153, 0)', // dark green
    activeTabIcon: 'rgb(204, 204, 0)', // yellow
    tabHeaderText: 'rgb(255, 255, 255)', // white
    tabHeaderBackground: 'rgb(204, 0, 0)', // dark red
    tabIconCircleBackground: 'rgb(0, 128, 255)', // blue
    tabIconBorderFill: 'rgb(255, 102, 102)', // light red
    goodText: 'rgb(250, 250, 250)',
    middlingText: 'rgb(0, 102, 204)',
    badText: 'rgb(204, 50, 50)',
  },
  analogous3: {
    // no (as in not really)
    viewBackground: 'rgb(244, 164, 96)', // sandybrown
    buttonBackground: 'rgb(218, 165, 32)', // goldenrod
    buttonText: 'rgb(255, 255, 255)', // white
    iconFill: 'rgb(240, 230, 140)', // khaki
    tableBackground: 'rgb(210, 180, 140)', // tan
    tableLineColor: 'rgb(184, 134, 11)', // darkgoldenrod
    navigationBackground: 'rgb(233, 150, 122)', // darksalmon
    navigationIcon: 'rgb(255, 255, 255)', // white
    middlingBackground: 'rgb(210, 105, 30)', // chocolate
    badBackground: 'rgb(165, 42, 42)', // brown
    tabBackground: 'rgb(205, 133, 63)', // peru
    activeTabBackground: 'rgb(222, 184, 135)', // burlywood
    inactiveTabIcon: 'rgb(139, 69, 19)', // saddlebrown
    activeTabIcon: 'rgb(255, 255, 255)', // white
    tabHeaderText: 'rgb(255, 255, 255)', // white
    tabHeaderBackground: 'rgb(218, 165, 32)', // goldenrod
    tabIconCircleBackground: 'black', // sandybrown
    tabIconBorderFill: 'rgb(184, 134, 11)', // darkgoldenrod
    goodText: 'rgb(250, 250, 250)',
    middlingText: 'rgb(200, 140, 60)',
    badText: 'rgb(200, 40, 40)',
  },
}

type ThemeContextProps = {
  theme: Theme
  setTheme: (Theme) => void
  setNextTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: themes.monochromatic,
  setTheme: (theme) => console.warn('no theme provider'),
  setNextTheme: () => console.warn('no theme provider'),
})

export const ThemeProvider: React.FC = ({ children }) => {
  const themesArray = Object.values(themes)
  const initialThemeIndex = themesArray.indexOf(themes.monochromatic)
  // sets the index of the theme we're using app-wide
  const [themeIndex, setThemeIndex] = useState(initialThemeIndex)
  const [theme, setTheme] = useState<Theme>(themesArray[themeIndex])

  const setNextTheme = (
    trackerItems,
    setTrackerItems,
    searchFoodList,
    setSearchFoodList,
    dispatch
  ) => {
    let nextIndex = themeIndex + 1
    if (nextIndex >= themesArray.length) nextIndex = 0
    console.log('ThemeContext, nextIndex:' + nextIndex)
    setThemeIndex(nextIndex)
    setTheme(themesArray[nextIndex])
    const currentTheme = themesArray[nextIndex]

    // set the carbBackgroundColor for trackerItems
    const newTrackerItems = [...trackerItems]
    const updatedItems = newTrackerItems.map((item) => {
      const newColor =
        item.carbAmt > 22
          ? currentTheme.badBackground
          : item.carbAmt > 11
          ? currentTheme.middlingBackground
          : currentTheme.tableBackground

      return {
        ...item,
        carbBackgroundColor: newColor,
      }
    })

    setTrackerItems(updatedItems)

    // set the carbBackgroundColor for searchFoodList
    const newFoodList = [...searchFoodList]
    const updatedFoodItems = newFoodList.map((item) => {
      const newColor =
        item.carbohydrates > 22
          ? currentTheme.badBackground
          : item.carbohydrates > 11
          ? currentTheme.middlingBackground
          : currentTheme.tableBackground

      return {
        ...item,
        carbBackgroundColor: newColor,
      }
    })
    dispatch(setSearchFoodList(updatedFoodItems))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, setNextTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
