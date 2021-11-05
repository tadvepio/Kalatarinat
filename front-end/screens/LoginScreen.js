import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Box from '../components/Box';
import ButtonWithIcon from '../components/ButtonWithIcon';
import { TextInput } from 'react-native-gesture-handler';

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
                <TextInput
                placeholder='Sähköposti'
                />
                <TextInput
                placeholder='Salasana'
                />

            </Box>
            <ButtonWithIcon title={'Kirjaudu sisään'} />

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
