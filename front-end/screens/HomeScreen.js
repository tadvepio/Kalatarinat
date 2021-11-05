import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Box from '../components/Box';
import ButtonWithIcon from '../components/ButtonWithIcon';

export default function HomeScreen() {
    
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Box>
                <Text>tähän tulee sää widgetti</Text>
            </Box>

            <ButtonWithIcon title={'Lisää uusi merkintä'} icon={'camerao'} />

            <Text style={styles.text}>Viimeisimmät merkinnät</Text>

            <Box>
                <Text>kala</Text>
            </Box>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    text: {
        marginTop: 40,
        marginLeft: 20,
        color: '#34344A',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
