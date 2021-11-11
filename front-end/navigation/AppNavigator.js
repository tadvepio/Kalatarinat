import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateEntryScreen from '../screens/CreateEntryScreen';
import ModifyEntryScreen from '../screens/ModifyEntryScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerMode: 'screen',
                    headerTitleAlign: 'center',
                    headerTintColor: '#34344A'
                }}
            >

                {/*Home*/}
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                
                <Stack.Screen name='HomeScreen' options={{headerShown: false}} component={HomeScreen} />
                  
                <Stack.Screen name='LoginScreen' options={{headerShown: false}} component={LoginScreen} />
                <Stack.Screen name='CreateEntryScreen' options={{title: 'Uusi merkintä'}} component={CreateEntryScreen} />
                <Stack.Screen name='ModifyEntryScreen' options={{title: 'Muokkaa merkintää'}} component={ModifyEntryScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
