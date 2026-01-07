package com.buachaillmaith.ketolimit

import android.os.Bundle // <--- Add this import
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

// 1. Add Bootsplash Import
import com.zoontek.rnbootsplash.RNBootSplash

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "KetoTrainAI"

    // 2. ADD THIS FUNCTION (It doesn't exist by default)
    override fun onCreate(savedInstanceState: Bundle?) {
        RNBootSplash.init(this, R.style.BootTheme) // Initialize the splash screen

        // "super.onCreate(null)" is REQUIRED by react-native-screens
        // to prevent crashes when Android kills/recreates the app background state.
        super.onCreate(null)
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}