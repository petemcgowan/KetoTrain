import * as React from 'react'
import { Text, StatusBar, View, SafeAreaView, StyleSheet } from 'react-native'
// import Constants from "expo-constants";
import Donut from './Donut'

import { getTotalCarbs, getTotalGILoad } from '../utils/GlycemicUtils'

// const data = [
//   {
//     percentage: 40,
//     color: "tomato",
//     max: 50,
//   },
//   // {
//   //   percentage: 14,
//   //   color: "skyblue",
//   //   max: 20,
//   // },
//   // {
//   //   percentage: 92,
//   //   color: "gold",
//   //   max: 100,
//   // },
//   {
//     percentage: 50,
//     max: 150,
//     percentage1: 25,
//     max1: 150,
//     percentage2: 50,
//     max2: 150,
//     color: "#222",
//   },
// ];

export default function DonutFactory() {
    let totalCarbsCapped = getTotalCarbs()
    let totalGILoadCapped = getTotalGILoad()
    let colorOfCarbChart = 'aqua'
    let colorOfGILoadChart = 'aqua'
    if (totalCarbsCapped > 50) {
        totalCarbsCapped = 50
        colorOfCarbChart = 'tomato'
    }
    console.log('totalCarbsCapped:' + totalCarbsCapped)
    if (totalGILoadCapped > 100) {
        totalGILoadCapped = 100
        colorOfGILoadChart = 'tomato'
    }
    console.log('totalGILoadCapped:' + totalGILoadCapped)

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                }}
            >
                <Donut
                    key={1}
                    percentage={totalCarbsCapped}
                    percentage1={totalCarbsCapped}
                    percentage2={totalCarbsCapped}
                    color={colorOfCarbChart}
                    delay={500 + 100 * 1}
                    max={50}
                    max1={50}
                    max2={50}
                />
                <Donut
                    key={2}
                    percentage={totalGILoadCapped}
                    percentage1={totalGILoadCapped}
                    percentage2={totalGILoadCapped}
                    color={colorOfGILoadChart}
                    delay={500 + 100 * 2}
                    max={100}
                    max1={100}
                    max2={100}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: "center",
        // paddingTop: Constants.statusBarHeight,
        // backgroundColor: "#fff",
        backgroundColor: '#000',
        // padding: 8,
    },
    paragraph: {
        // margin: 24,
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
