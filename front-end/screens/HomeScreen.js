import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Box from '../components/Box';

export default function HomeScreen() {
    
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Box>
                <Text>tähän tulee sää widgetti</Text>
            </Box>

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
        marginLeft: 15,
        color: '#34344A',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
