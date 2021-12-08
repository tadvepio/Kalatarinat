import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateEntryScreen from '../screens/CreateEntryScreen';
import ModifyEntryScreen from '../screens/ModifyEntryScreen';
import AllEntriesScreen from '../screens/AllEntriesScreen';
import ProfileScreen from '../screens/ProfileScreen';

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

                <Stack.Screen name='LoginScreen' options={{headerShown: false}} component={LoginScreen} />
                <Stack.Screen name='HomeScreen' options={{headerShown: false}} component={HomeScreen} />
                <Stack.Screen name='CreateEntryScreen' options={{title: 'Uusi merkintä'}} component={CreateEntryScreen} />
                <Stack.Screen name='ModifyEntryScreen' options={{title: 'Muokkaa merkintää'}} component={ModifyEntryScreen} />
                <Stack.Screen name='AllEntriesScreen' options={{title: 'Kaikki merkinnät', headerLeft: null}} component={AllEntriesScreen} />
                <Stack.Screen name='ProfileScreen' options={{title: 'Oma profiili', headerLeft: null}} component={ProfileScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
