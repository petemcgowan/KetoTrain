import React, { useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { ThemeContext } from '../state/ThemeContext'
import UserContext from '../state/UserContext'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import Config from 'react-native-config'

const { height } = Dimensions.get('window')

export function CustomDrawer(props: any) {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('No Theme Context')
  const { theme } = context

  // Safe check for UserContext
  const userContext = useContext(UserContext)
  const userEmail = userContext?.emailAddress || 'User'
  const userInitial = userEmail.charAt(0).toUpperCase()

  const styles = getStyles(theme)

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{userInitial}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.welcomeText}>Logged in as</Text>
          <Text style={styles.emailText} numberOfLines={1}>
            {userEmail}
          </Text>
        </View>
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.menuContainer}
      >
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.closeDrawer()}
        >
          <FontAwesome6
            name="xmark"
            size={20}
            color={theme.buttonText}
            iconStyle="solid"
          />
          <Text style={styles.menuText}>Close Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, styles.dangerItem]}
          onPress={() => props.navigation.navigate('DeleteAccount')}
        >
          <FontAwesome6
            name="trash-can"
            size={18}
            color="#ff6b6b"
            iconStyle="solid"
          />
          <Text style={[styles.menuText, styles.dangerText]}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </DrawerContentScrollView>

      <View style={styles.footerContainer}>
        <Text style={styles.versionText}>
          v{Config.VERSION_NAME || '3.0.1'}
        </Text>
      </View>
    </View>
  )
}

const getStyles = (theme: any) =>
  StyleSheet.create({
    drawerContainer: {
      flex: 1,
      backgroundColor: theme.viewBackground,
      paddingTop: height * 0.06,
    },
    headerContainer: {
      paddingHorizontal: 20,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatarCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.buttonBackground,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    avatarText: { fontSize: 24, fontWeight: 'bold', color: 'white' },
    welcomeText: {
      color: theme.buttonText,
      opacity: 0.6,
      fontSize: 12,
      textTransform: 'uppercase',
    },
    emailText: { color: theme.buttonText, fontSize: 16, fontWeight: 'bold' },
    menuContainer: { paddingHorizontal: 15 },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 15,
      marginBottom: 10,
      borderRadius: 15,
      backgroundColor: 'rgba(255,255,255,0.03)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.05)',
    },
    menuText: {
      fontSize: 16,
      color: theme.buttonText,
      fontWeight: '600',
      marginLeft: 15,
    },
    dangerItem: {
      marginTop: 20,
      borderColor: 'rgba(255, 107, 107, 0.2)',
      backgroundColor: 'rgba(255, 107, 107, 0.05)',
    },
    dangerText: { color: '#ff6b6b' },
    footerContainer: { padding: 20, alignItems: 'center', marginBottom: 20 },
    versionText: { color: theme.buttonText, opacity: 0.3, fontSize: 12 },
  })
