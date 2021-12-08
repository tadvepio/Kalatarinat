import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Box from '../components/Box';
import TextInputField from '../components/TextInputField';
import ButtonWithIcon from '../components/ButtonWithIcon';

export default function LoginScreen() {
    
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView>

                <Image style={styles.logo} source={require('../assets/logo.png')} />

                <Text style={styles.text}>Kirjaudu sisään</Text>
                <Box>
                    <TextInputField 
                        icon={'at'} 
                        textInputProps={{
                            placeholder: 'Sähköposti',
                            defaultValue: 'user@kalatarinat.com'
                        }}        
                    />

                    <TextInputField 
                        icon={'key'} 
                        textInputProps={{
                            placeholder: 'Salasana',
                            secureTextEntry: true,
                            defaultValue: 'salasana'
                        }}        
                    />
                </Box>

                <ButtonWithIcon title={'Kirjaudu sisään'} onPress={() => navigation.navigate('HomeScreen')} />

                <ButtonWithIcon title={'Luo tunnukset'} />
            </ScrollView>

            <View style={styles.navigationContainer}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 250,
        marginTop: 20,
        alignSelf: 'center',
    },
    text: {
        marginTop: 40,
        color: '#34344A',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    navigationContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        height: 60, 
        width: '100%',
        backgroundColor: '#EC0868',
    },
});
