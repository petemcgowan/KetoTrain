import React, { useContext, useState, memo } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Animated,
    SafeAreaView,
    Easing,
} from 'react-native'

import TrackerContext from '../state/TrackerContext'
import GlycemicContext from '../state/GlycemicContext'
// import styled, {withTheme} from "styled-components";
import GlycemicItem from './GlycemicItem'
import { getGLResult } from '../utils/GlycemicUtils'

interface GlycemicListProps {
    searchPhrase: string
    setClicked: (clicked: boolean) => void
}

// the filter
const GlycemicList = ({ searchPhrase, setClicked }: GlycemicListProps) => {
    const { setTotalCarbs, setTotalGILoad } = useContext(TrackerContext)
    const { glycemicData } = useContext(GlycemicContext)
    const [searchItemSelected, setSearchItemSelected] = useState(0)

    const [opacityAnimatedValue, setOpacityAnimatedValue] = useState(
        new Animated.Value(0)
    )

    const animatedOpacitySequence = () => {
        Animated.sequence([
            Animated.timing(opacityAnimatedValue, {
                toValue: 1,
                easing: Easing.inOut(Easing.ease),
                duration: 1200,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnimatedValue, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start()
    }

    const animatedStyle = {
        opacity: opacityAnimatedValue,
    }

    // item is an entry in the glycemicData/data list
    const renderItem = ({ item }) => {
        // const giLoad = getGLResult(item.carbAmt, item.giAmt, item.glAmt);
        // when no input, show all
        // console.log("renderItem calle for " + item.description);
        if (searchPhrase === '') {
            return (
                <GlycemicItem
                    descriptionGI={item.description}
                    setTotalCarbs={setTotalCarbs}
                    setTotalGILoad={setTotalGILoad}
                    carbAmt={Math.round(item.carbAmt)}
                    // carbAmt={item.carbAmt}
                    giAmt={item.giAmt}
                    glAmt={item.glAmt}
                    fiberAmt={item.fiberAmt}
                    proteinAmt={item.proteinAmt}
                    fatAmt={item.fatAmt}
                    energyAmt={item.energyAmt}
                    sugarsAmt={item.sugarsAmt}
                    sodiumAmt={item.sodiumAmt}
                    animatedOpacitySequence={animatedOpacitySequence}
                    setSearchItemSelected={setSearchItemSelected}
                    searchItemSelected={searchItemSelected}
                />
            )
        }
        // filter of the description
        if (
            item.description
                .toUpperCase()
                .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
        ) {
            return (
                <GlycemicItem
                    descriptionGI={item.description}
                    setTotalCarbs={setTotalCarbs}
                    setTotalGILoad={setTotalGILoad}
                    carbAmt={Math.round(item.carbAmt)}
                    // carbAmt={item.carbAmt}
                    giAmt={item.giAmt}
                    glAmt={item.glAmt}
                    fiberAmt={item.fiberAmt}
                    proteinAmt={item.proteinAmt}
                    fatAmt={item.fatAmt}
                    energyAmt={item.energyAmt}
                    sugarsAmt={item.sugarsAmt}
                    sodiumAmt={item.sodiumAmt}
                    animatedOpacitySequence={animatedOpacitySequence}
                    setSearchItemSelected={setSearchItemSelected}
                    searchItemSelected={searchItemSelected}
                />
            )
        }
    }

    return (
        <SafeAreaView style={styles.list__container}>
            <View
            // onStartShouldSetResponder={() => {
            //   setClicked(false);
            // }}
            >
                <FlatList
                    data={glycemicData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.description}
                />
            </View>
            <Animated.View style={[styles.box, animatedStyle]}>
                <View style={styles.nutritionElementBox}>
                    <Text>{glycemicData[searchItemSelected].description}</Text>
                </View>
                <View style={styles.nutritionElementBox}>
                    <Text style={styles.labelText}>GI:</Text>
                    <Text style={styles.valueText}>
                        {glycemicData[searchItemSelected].giAmt}
                    </Text>
                </View>
                <View style={styles.nutritionElementBox}>
                    <Text style={styles.labelText}>GI Load:</Text>
                    <Text style={styles.valueText}>
                        {glycemicData[searchItemSelected].glAmt}
                    </Text>
                </View>
                <View style={styles.nutritionElementBox}>
                    <Text style={styles.labelText}>Carb:</Text>
                    <Text style={styles.valueText}>
                        {glycemicData[searchItemSelected].carbAmt}
                    </Text>
                </View>
                <View style={styles.nutritionElementBox}>
                    <Text style={styles.labelText}>Fibre:</Text>
                    <Text style={styles.valueText}>
                        {glycemicData[searchItemSelected].fiberAmt}
                    </Text>
                </View>
                <View style={styles.nutritionElementBox}>
                    <Text style={styles.labelText}>Protein:</Text>
                    <Text style={styles.valueText}>
                        {glycemicData[searchItemSelected].proteinAmt}
                    </Text>
                </View>
                <View style={styles.nutritionElementBox}>
                    <Text style={styles.labelText}>Fat:</Text>
                    <Text style={styles.valueText}>
                        {glycemicData[searchItemSelected].fatAmt}
                    </Text>
                </View>
                <View style={styles.nutritionElementBox}>
                    <Text style={styles.labelText}>kCal:</Text>
                    <Text style={styles.valueText}>
                        {glycemicData[searchItemSelected].energyAmt}
                    </Text>
                </View>
                <View style={styles.nutritionElementBox}>
                    <Text style={styles.labelText}>Sugars:</Text>
                    <Text style={styles.valueText}>
                        {glycemicData[searchItemSelected].sugarsAmt}
                    </Text>
                </View>
                <View style={styles.nutritionElementBox}>
                    <Text style={styles.labelText}>Sodium:</Text>
                    <Text style={styles.valueText}>
                        {glycemicData[searchItemSelected].sodiumAmt}
                    </Text>
                </View>
            </Animated.View>
        </SafeAreaView>
    )
}

function arePropsEqual(prevProps, nextProps) {
    console.log('**********prevProps:' + prevProps + ', nextProps:' + nextProps)
    return prevProps.description === nextProps.description
}

export default memo(GlycemicList, arePropsEqual)

// const Row = styled(View)`
//   /* width: 100%; */
//   /* flex-direction: row; */
//   /* justify-content: space-between;
// align-items: center; */
// `;

const styles = StyleSheet.create({
    nutritionElementBox: {
        flexDirection: 'row',
    },
    valueText: {},
    labelText: {
        fontWeight: 'bold',
    },
    list__container: {
        // margin: 10,
        height: '88%',
        width: '100%',
        justifyContent: 'center',
    },
    box: {
        backgroundColor: 'rgba(59, 73, 55, 1)',
        textAlign: 'center',
        justifyContent: 'center',
        // width: 200,
        // height: 200,
        position: 'absolute',
        // backgroundColor: 'lightgrey',
        color: 'white',
        left: 70,
        top: 20,
    },
    // item: {
    //   margin: 5,
    //   borderBottomWidth: 2,
    //   borderBottomColor: "lightgrey",
    // },
    // description: {
    //   fontFamily: "Karla-Light",
    //   fontSize: 18,
    //   color: "#FFF",
    //   fontWeight: "bold",
    //   // marginBottom: 5,
    //   fontStyle: "italic",
    // },
})
