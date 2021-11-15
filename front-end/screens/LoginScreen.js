import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Box from '../components/Box';
import ButtonWithIcon from '../components/ButtonWithIcon';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen() {
    
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <Image
            
            style={styles.logoStyle} 
            source={require('../assets/logo.png')}
            />
            <Text style={styles.text}>Kirjaudu sisään</Text>
            <Box style={styles.boxStyle}>
                <MaterialIcons size={25} color='#EC0868' name="alternate-email" />
                <TextInput
                placeholder='Sähköposti'
                />
                <Ionicons size={25} color='#EC0868' name="key-outline"/>
                <TextInput
                placeholder='Salasana'
                />

            </Box>
            <ButtonWithIcon title={'Kirjaudu sisään'} onPress={() => navigation.navigate('HomeScreen')} />

            <ButtonWithIcon title={'Luo tunnukset'} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
        margin: 15,
    },
    logoStyle: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
    boxStyle: {
        margin: 15,
        padding: 15,
    },
    text: {
        marginTop: 40,
        marginLeft: 20,
        color: '#34344A',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        
    },
});
