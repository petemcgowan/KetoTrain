import React, { useContext } from 'react'
import { Modal, TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { ThemeContext, themes } from '../state/ThemeContext'

const ThemeModal = ({ modalVisible, setModalVisible }) => {
  const { setTheme } = useContext(ThemeContext)

  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              setTheme(themes.monochromatic)
              setModalVisible(!modalVisible)
            }}
          >
            <Text style={styles.modalText}>Monochromatic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTheme(themes.complementary)
              setModalVisible(!modalVisible)
            }}
          >
            <Text style={styles.modalText}>Complementary</Text>
          </TouchableOpacity>
          {/* Add other themes similarly */}
          <TouchableOpacity
            style={{
              ...styles.openButton,
              backgroundColor: '#2196F3',
            }}
            onPress={() => {
              setModalVisible(!modalVisible)
            }}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ThemeModal

const getStyles = (theme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    openButton: {
      backgroundColor: '#F194FF',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  })
