import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

export function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Delete Account"
        onPress={() => props.navigation.navigate('DeleteAccount')}
      />
      <DrawerItem
        label="Close Drawer"
        onPress={() => {
          props.navigation.closeDrawer()
        }}
      />
    </DrawerContentScrollView>
  )
}
