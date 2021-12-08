import React from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesome5} from '@expo/vector-icons';

import ButtonWithIcon from '../components/ButtonWithIcon';

export default function ProfileScreen() {
    
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView>

                <FontAwesome5 name={'user'} size={70} color={'#EC0868'} style={{alignSelf: 'center', marginTop: 50}} />

                <Text style={styles.text}>user@kalatarinat.com</Text>

                <ButtonWithIcon title={'Kirjaudu ulos'} onPress={() => navigation.navigate('LoginScreen')} />

            </ScrollView>

            {/* Bottom navigation */}
            <View style={styles.navigationContainer}>
                <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('HomeScreen')}>
                    <FontAwesome5 name={'home'} size={25} color={'#ffffff'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('AllEntriesScreen')}>
                    <FontAwesome5 name={'fish'} size={25} color={'#ffffff'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('ProfileScreen')}>
                    <FontAwesome5 name={'user'} size={25} color={'#ffffff'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    text: {
        marginTop: 20,
        marginBottom: 100,
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
    },
    navigationButton: {
        backgroundColor: '#EC0868', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '33%',
    },
});
