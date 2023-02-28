package com.glycemic_limit_native;

import android.os.Bundle; // react native splash screen
import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen; //  react native splash screen

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);  // here
      super.onCreate(savedInstanceState);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "glycemic_limit_native";
  }
}
