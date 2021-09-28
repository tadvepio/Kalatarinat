import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerMode: 'screen',
                    headerTitleAlign: 'center',
                    headerTitle: '',
                    headerTransparent: true,
                }}
            >

                {/*Home*/}
                <Stack.Screen name="HomeScreen" component={HomeScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
