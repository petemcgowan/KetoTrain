import React, { useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Alert, TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import { DrawerNavigationProp } from '@react-navigation/drawer'
import { useDrawerStatus } from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native'

import { RootParamList } from '../types/RootParamList'
import UserContext from '../state/UserContext'
import { ThemeContext } from '../state/ThemeContext'
import DELETE_USER from '../types/DELETE_USER'
import { actionCreators } from '../redux/index'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

type DeleteAccountScreenNavigationProp = DrawerNavigationProp<
  RootParamList,
  'DeleteAccountScreen'
>

export function DeleteAccountScreen() {
  const navigation = useNavigation<DeleteAccountScreenNavigationProp>()
  const drawerStatus = useDrawerStatus()

  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)

  const [deleteUser, { loading, error }] = useMutation(DELETE_USER)
  const { userId } = useContext(UserContext)
  const dispatch = useDispatch()
  const { updateHasSeenIntro } = bindActionCreators(actionCreators, dispatch)

  const handleDelete = async () => {
    try {
      // Call GraphQL mutation to delete the account here
      const response = await deleteUser({ variables: { userId: userId } })

      if (response.data.deleteUser) {
        // Success case.., show a confirmation message
        Alert.alert('Success', 'Your account has been deleted.')
        navigation.navigate('OnboardingDeck')
        updateHasSeenIntro(false)
      } else {
        // Didn't delete case.., show a confirmation message
        console.log('ERROR, the user may not have been deleted')
        Alert.alert(
          'Oops',
          'the account may not have been deleted.  Try exiting/re-entering the app and try again'
        )
      }
    } catch (error) {
      console.error('There was an error deleting your account.', error)
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
