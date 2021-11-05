import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Box from '../components/Box';
import ButtonWithIcon from '../components/ButtonWithIcon';
import { ScrollView } from 'react-native-gesture-handler';


export default function HomeScreen() {
    
    const navigation = useNavigation();

    return (
        <ScrollView>

            <Image
            style={styles.logoStyle} 
            source={require('../assets/logo.png')}
            />
        <View style={styles.container}>
            <Box style={styles.boxContainer}>
                
                <Text style={styles.text}>tähän tulee sää widgetti</Text>
            </Box>

            <ButtonWithIcon title={'Lisää uusi merkintä'} icon={'plus'} />

            <Text style={styles.text}>Viimeisimmät merkinnät</Text>

            <Box>
                <Text>kala</Text>
                <ButtonWithIcon 
                title={'Tarkastele'} 
                icon={'eyeo'} 
                />
            </Box>
            <Box>
                <Text>kala</Text>
            </Box>
            <Box>
                <Text>kala</Text>
            </Box>
            <Box>
                <Text>kala</Text>
            </Box>
            <Box>
                <Text>kala</Text>
            </Box>

        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    logoStyle: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
    boxContainer: {
        marginTop: 50,
    },
    text: {
        marginTop: 40,
        marginLeft: 20,
        color: '#34344A',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
