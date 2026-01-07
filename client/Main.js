import React from 'react';
import firebase from '@react-native-firebase/app';

import App from './App';
import Config from 'react-native-config';
import { Platform } from 'react-native';

import { getAnalytics } from '@react-native-firebase/analytics';

// if (Platform.OS === 'android') {
// let getAnalytics
// getAnalytics = require('@react-native-firebase/analytics')

const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  appId: Config.FIREBASE_APP_ID,
  measurementId: Config.FIREBASE_MEASUREMENT_ID,
};
let app = null;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}
const analytics = getAnalytics(app);
// }

export const Main: React.FC = () => {
  return <App />;
};

export default Main;
