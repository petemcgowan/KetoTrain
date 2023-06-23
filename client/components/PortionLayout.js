import React, { memo, useState, useEffect, useContext } from 'react'
import TrackerContext from '../state/TrackerContext'
import { StyleSheet, View, Pressable } from 'react-native'

interface PortionLayoutProps {
    portion1BackgroundColor: string;
    portion2BackgroundColor: string;
    portion3BackgroundColor: string;
    portion4BackgroundColor: string;
    boxWidth: number;
    boxHeight: number;
    textFontSize: number;
    portionAmount: number;
    itemKey: string;
}

const PortionLayout = ({
    portion1BackgroundColor,
    portion2BackgroundColor,
    portion3BackgroundColor,
    portion4BackgroundColor,
    boxWidth,
    boxHeight,
    textFontSize,
    portionAmount,
    itemKey,
}: PortionLayoutProps) => {
    const [portion1BGColor, setPortion1BGColor] = useState(
        portion1BackgroundColor
    )
    const [portion2BGColor, setPortion2BGColor] = useState(
        portion2BackgroundColor
    )
    const [portion3BGColor, setPortion3BGColor] = useState(
        portion3BackgroundColor
    )
    const [portion4BGColor, setPortion4BGColor] = useState(
        portion4BackgroundColor
    )
    const { trackerItems, setTrackerItems } = useContext(TrackerContext)

    const dynamicStyles = StyleSheet.create({
        box: {
            width: boxWidth,
            height: boxHeight,
            padding: 1,
        },
        text: {
            color: 'rgba(201, 189, 187, 1)',
            fontSize: textFontSize,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: '200',
        },
    })

    const pressPortion1 = () => {
        const trackerClicked = trackerItems.find(
            ({ description }) => description === itemKey
        )

        if (portion1BGColor === 'black') {
            trackerClicked.portionAmount++
            setPortion1BGColor(
                trackerClicked.portionAmount > 0 ? '#7A069B' : 'black'
            )
        } else {
            setPortion1BGColor('black')
            trackerClicked.portionAmount--
        }
        console.log(
            'pressPortion1, trackerClicked:' + JSON.stringify(trackerClicked)
        )
        setTrackerItems(trackerItems)
    }

    const pressPortion2 = () => {
        const trackerClicked = trackerItems.find(
            ({ description }) => description === itemKey
        )
        if (portion2BGColor === 'black') {
            trackerClicked.portionAmount++
            setPortion2BGColor(
                trackerClicked.portionAmount > 1 ? '#620B7B' : 'black'
            )
        } else {
            trackerClicked.portionAmount--
            setPortion2BGColor('black')
        }
        console.log(
            'pressPortion2, trackerClicked:' + JSON.stringify(trackerClicked)
        )
        setTrackerItems(trackerItems)
    }

    const pressPortion3 = () => {
        const trackerClicked = trackerItems.find(
            ({ description }) => description === itemKey
        )
        if (portion3BGColor === 'black') {
            trackerClicked.portionAmount++
            setPortion3BGColor(
                trackerClicked.portionAmount > 2 ? '#370246' : 'black'
            )
        } else {
            trackerClicked.portionAmount--
            setPortion3BGColor('black')
        }
        console.log(
            'pressPortion3, trackerClicked:' + JSON.stringify(trackerClicked)
        )
        setTrackerItems(trackerItems)
    }

    const pressPortion4 = () => {
        const trackerClicked = trackerItems.find(
            ({ description }) => description === itemKey
        )
        if (portion4BGColor === 'black') {
            trackerClicked.portionAmount++
            setPortion4BGColor(
                trackerClicked.portionAmount > 3 ? '#200129' : 'black'
            )
        } else {
            trackerClicked.portionAmount--
            setPortion4BGColor('black')
        }
        console.log(
            'pressPortion4, trackerClicked:' + JSON.stringify(trackerClicked)
        )
        setTrackerItems(trackerItems)
    }

    useEffect(() => {
        console.log('PortionLayout useEffect called')
        // Here I want to initialise the colours to their proper settings based on the portionAmount passed.  Could this also just be done at the initialisation phase?
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', padding: 3 }}>
                <Pressable
                    onPress={pressPortion1}
                    style={[
                        dynamicStyles.box,
                        { backgroundColor: portion1BGColor },
                    ]}
                >
                    {/* <Text style={dynamicStyles.text}>{giAmt}</Text> */}
                </Pressable>
                <Pressable
                    onPress={pressPortion2}
                    style={[
                        dynamicStyles.box,
                        { backgroundColor: portion2BGColor },
                    ]}
                >
                    {/* <Text style={dynamicStyles.text}>{glAmt}</Text> */}
                </Pressable>
                <Pressable
                    onPress={pressPortion3}
                    style={[
                        dynamicStyles.box,
                        { backgroundColor: portion3BGColor },
                    ]}
                >
                    {/* <Text style={dynamicStyles.text}>{carbAmt}</Text> */}
                </Pressable>
                <Pressable
                    onPress={pressPortion4}
                    style={[
                        dynamicStyles.box,
                        { backgroundColor: portion4BGColor },
                    ]}
                >
                    {/* <Text style={dynamicStyles.text}>{carbAmt}</Text> */}
                </Pressable>
            </View>
        </View>
    )
}

export default memo(PortionLayout)
