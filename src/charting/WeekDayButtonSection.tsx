import React, { FC } from 'react'

import { View, Pressable, Text, StyleSheet } from 'react-native'

type ButtonSectionProps = {
    d1Tapped: () => void
    d2Tapped: () => void
    d3Tapped: () => void
    d4Tapped: () => void
    d5Tapped: () => void
    d6Tapped: () => void
    d7Tapped: () => void
}

type DayButtonProps = {
    onPress: () => void
    title: string
}

const DayButton: FC<DayButtonProps> = ({ onPress, title }) => {
    return (
        <Pressable onPress={onPress} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    )
}

const WeekDayButtonSection: FC<ButtonSectionProps> = ({
    d1Tapped,
    d2Tapped,
    d3Tapped,
    d4Tapped,
    d5Tapped,
    d6Tapped,
    d7Tapped,
}) => {
    return (
        <View style={styles.container}>
            <DayButton onPress={d1Tapped} title={'D1'} />
            <DayButton onPress={d2Tapped} title={'D2'} />
            <DayButton onPress={d3Tapped} title={'D3'} />
            <DayButton onPress={d4Tapped} title={'D4'} />
            <DayButton onPress={d5Tapped} title={'D5'} />
            <DayButton onPress={d6Tapped} title={'D6'} />
            <DayButton onPress={d7Tapped} title={'D7'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 20,
        marginTop: 5,
    },
    buttonContainer: {
        height: 25,
        width: 55,
        backgroundColor: '#c931ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        textAlign: 'center',
        // color: 'white',
        color: '#ceff31',
        fontWeight: 'bold',
    },
})

export default WeekDayButtonSection
