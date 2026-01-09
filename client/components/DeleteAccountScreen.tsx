import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { ThemeContext } from '../state/ThemeContext'
import UserContext from '../state/UserContext'
import { RFPercentage } from 'react-native-responsive-fontsize'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import auth from '@react-native-firebase/auth'
import { useMutation } from '@apollo/client/react'
import { gql } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { actionCreators } from '../redux/index'
import { bindActionCreators } from 'redux'
import { CommonActions } from '@react-navigation/native'

// Define Mutation Inline to ensure it works without extra file dependencies
const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId)
  }
`

export default function DeleteAccountScreen({ navigation }: any) {
  const { theme } = useContext(ThemeContext)!
  const styles = getStyles(theme)

  const { userId } = useContext(UserContext)

  const emailAddress = useSelector((state: RootState) => state.emailAddress)

  const dispatch = useDispatch()
  const { updateHasSeenIntro, updateEmailAddress } = bindActionCreators(
    actionCreators,
    dispatch
  )

  // Setup Apollo Mutation
  const [deleteUserGraphql] = useMutation(DELETE_USER_MUTATION)

  const handleDelete = async () => {
    Alert.alert(
      'Delete Account',
      'This action is permanent. All your data (Logs, Favorites, Auth) will be wiped immediately.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'DELETE',
          style: 'destructive',
          onPress: performDelete,
        },
      ]
    )
  }

  const performDelete = async () => {
    try {
      // delete from postgres via graphql
      console.log(`Deleting user DB record: ${userId}`)
      await deleteUserGraphql({ variables: { userId: String(userId) } })

      // Delete from Firebase Auth
      const user = auth().currentUser
      if (user) {
        await user.delete()
        console.log('Firebase user deleted')
      }

      //  Reset Redux State
      updateHasSeenIntro(false)
      updateEmailAddress('')

      // Reset Navigation Stack to Onboarding
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'OnboardingDeck' }],
        })
      )

      Alert.alert('Account Deleted', "We're sorry to see you go.")
    } catch (error: any) {
      console.error('Delete Error:', error)
      // Even if one fails, we usually want to try to log them out
      if (error.code === 'auth/requires-recent-login') {
        Alert.alert(
          'Security Check',
          'Please log out and log back in to verify identity before deleting.'
        )
      } else {
        Alert.alert(
          'Error',
          'Could not fully delete account. Please contact support.'
        )
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.warningBox}>
        <FontAwesome6
          name="triangle-exclamation"
          size={RFPercentage(6)}
          color="#ff6b6b"
          iconStyle="solid"
        />
        <Text style={styles.warningTitle}>Danger Zone</Text>
        <Text style={styles.warningText}>
          You are about to permanently delete the account for:{'\n'}
          <Text style={{ fontWeight: 'bold', color: theme.buttonText }}>
            {emailAddress}
          </Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>PERMANENTLY DELETE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  )
}

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.viewBackground,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    warningBox: {
      alignItems: 'center',
      marginBottom: 50,
      backgroundColor: 'rgba(255, 107, 107, 0.05)',
      padding: 30,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'rgba(255, 107, 107, 0.2)',
      width: '100%',
    },
    warningTitle: {
      fontSize: RFPercentage(3.5),
      fontWeight: 'bold',
      color: '#ff6b6b',
      marginTop: 20,
    },
    warningText: {
      fontSize: RFPercentage(2.2),
      color: theme.buttonText,
      textAlign: 'center',
      marginTop: 15,
      lineHeight: 28,
      opacity: 0.8,
    },
    deleteButton: {
      backgroundColor: '#ff6b6b', // Solid red for primary action
      width: '100%',
      padding: 18,
      borderRadius: 15,
      alignItems: 'center',
      marginBottom: 15,
      shadowColor: '#ff6b6b',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 5,
    },
    deleteText: {
      color: 'white',
      fontWeight: '900',
      letterSpacing: 1,
      fontSize: RFPercentage(2.2),
    },
    cancelButton: {
      padding: 15,
    },
    cancelText: {
      color: theme.buttonText,
      opacity: 0.6,
      fontSize: RFPercentage(2.0),
    },
  })
