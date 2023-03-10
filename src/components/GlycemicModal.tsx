import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Modal,
    Alert,
    // ImageBackground,
} from 'react-native'

import { withTheme } from 'styled-components'

interface GlycemicModalProps {
    modalVisible: boolean
    setModalVisible: (modalVisible: boolean) => void
    description: string
    carbAmt: number
    giAmt: number
    glAmt: number
    fiberAmt: number
    proteinAmt: number
    fatAmt: number
    energyAmt: number
    sugarsAmt: number
    sodiumAmt: number
    giImageToUse: string
    glImageToUse: string
    carbImageToUse: string
}

// the filter
const GlycemicModal = ({
    modalVisible,
    setModalVisible,
    description,
    carbAmt,
    giAmt,
    glAmt,
    fiberAmt,
    proteinAmt,
    fatAmt,
    energyAmt,
    sugarsAmt,
    sodiumAmt,
    giImageToUse,
    glImageToUse,
    carbImageToUse,
}: GlycemicModalProps) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.')
                setModalVisible(!modalVisible)
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: 22,
                }}
            >
                <View style={styles.modalView}>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}
                    >
                        <View
                            style={{
                                width: '33%',
                                height: 40,
                                flexDirection: 'row',
                            }}
                        >
                            <Text style={styles.labelText}>GI:</Text>
                            <Text style={styles.valueText}>8</Text>
                        </View>
                        <View
                            style={{
                                width: '33%',
                                height: 40,
                                flexDirection: 'row',
                            }}
                        >
                            <Text style={styles.labelText}>GI Load:</Text>
                            <Text style={styles.valueText}>8</Text>
                        </View>
                        <View style={styles.nutritionElementBox}>
                            <Text style={styles.labelText}>Carb:</Text>
                            <Text style={styles.valueText}>8</Text>
                        </View>
                        <View style={styles.nutritionElementBox}>
                            <Text style={styles.labelText}>Fibre:</Text>
                            <Text style={styles.valueText}>8</Text>
                        </View>
                        <View style={styles.nutritionElementBox}>
                            <Text style={styles.labelText}>Protein:</Text>
                            <Text style={styles.valueText}>8</Text>
                        </View>
                        <View style={styles.nutritionElementBox}>
                            <Text style={styles.labelText}>Fat:</Text>
                            <Text style={styles.valueText}>8</Text>
                        </View>
                        <View style={styles.nutritionElementBox}>
                            <Text style={styles.labelText}>kCal:</Text>
                            <Text style={styles.valueText}>8</Text>
                        </View>
                        <View style={styles.nutritionElementBox}>
                            <Text style={styles.labelText}>Sugars:</Text>
                            <Text style={styles.valueText}>8</Text>
                        </View>
                        <View style={styles.nutritionElementBox}>
                            <Text style={styles.labelText}>Sodium:</Text>
                            <Text style={styles.valueText}>8</Text>
                        </View>
                    </View>

                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>Food added</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default withTheme(GlycemicModal)

const styles = StyleSheet.create({
    // Modal CSS
    modalView: {
        margin: 20,
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 35,
        width: 300,
        height: 300,
        flexDirection: 'column',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    labelText: {
        color: 'white',
        width: 60,
        backgroundColor: 'powderblue',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        padding: 2,
        // backgroundColor: "black",
    },
    valueText: {
        color: 'white',
        // backgroundColor: "aqua",
        width: 25,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        padding: 2,
        backgroundColor: 'black',
    },
    nutritionElementBox: {
        width: '33%',
        height: 40,
        flexDirection: 'row',
    },
    image: {
        // justifyContent: "center",
        width: 24, //24
        height: 24, //24
    },
    centeredView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    // Modal CSS
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
})
