import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Platform, StatusBar} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';


//Apollo stuff to connect with backend
import { ApolloProvider } from "@apollo/react-hooks";
import createApolloClient from './utils/apolloClient';
//This is used with ApolloProvider to wrap entire app to utilize Apollo/GraphQL
const apolloClient = createApolloClient();

import AppNavigator from './navigation/AppNavigator';

export default function App(props) {

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
      }
      catch (e) {
        console.warn(e);
      }
      finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  }
  
  else {
    return (
      <ApolloProvider client={apolloClient}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
          <AppNavigator />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
