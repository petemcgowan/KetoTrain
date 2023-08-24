// import { navigate } from './RootNavigation'
// navigate('OnboardingDeck')

import React, { useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Alert, TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { ThemeContext } from '../state/ThemeContext'
import { useNavigation } from '@react-navigation/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
// import { navigate } from './RootNavigation'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RootParamList } from '../types/RootParamList'
import { useDrawerStatus } from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native'
type DeleteAccountScreenNavigationProp = DrawerNavigationProp<
  RootParamList,
  'DeleteAccountScreen'
>

export function DeleteAccountScreen() {
  const navigation = useNavigation<DeleteAccountScreenNavigationProp>()
  const drawerStatus = useDrawerStatus()
  // const dispatch = useDispatch()

  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  const [deleteUser, { loading, error }] = useMutation(DELETE_USER)

  const handleDelete = async () => {
    try {
      // Call GraphQL mutation to delete the account here
      const response = await deleteUser({ variables: { userId: YOUR_USER_ID } })

      if (response.data.deleteUser) {
        // Success case...
      }
      // Show a confirmation message
      Alert.alert('Success', 'Your account has been deleted.')

      // Redirect to OnboardingDeck route
      navigation.navigate('OnboardingDeck')
    } catch (error) {
      Alert.alert('Error', 'There was an error deleting your account.')
    }
  }

  const handleBack = () => {
    if (drawerStatus === 'open') {
      navigation.dispatch(DrawerActions.closeDrawer())
      // dispatch(DrawerActions.closeDrawer());
    }
    navigation.goBack()
  }

  // const handleBack = () => {
  //   navigate.closeDrawer()
  //   // navigation.closeDrawer()
  //   navigation.goBack()
  // }

  return (
    <View style={[styles.container, styles.viewBackground]}>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete My Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonView: {
      backgroundColor: theme.middlingText,
      width: 160,
      borderRadius: 40,
      marginBottom: 40,
    },
    viewBackground: {
      backgroundColor: theme.viewBackground,
    },
    buttonText: {
      textAlign: 'center',
      color: theme.buttonText,
      fontSize: RFPercentage(3.2),
    },
  })
